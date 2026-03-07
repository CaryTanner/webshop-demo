using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly WebshopContext _context;

    public OrdersController(WebshopContext context)
    {
        _context = context;
    }

    // GET: api/orders (admin only, no Payment/Shipping)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetOrders()
    {
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized();
        var isAdmin = User.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;
        IQueryable<Order> query = _context.Orders.Include(o => o.User).Include(o => o.Items);
        if (isAdmin != "True" && isAdmin != "true")
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized();
            query = query.Where(o => o.UserId == userId);
        }
        var now = DateTime.UtcNow;
        var orders = await query
            .Where(o => !(o.Status == OrderStatus.Draft && o.CreatedAt < now.AddHours(-24)))
            .Select(o => new
            {
                o.Id,
                o.CreatedAt,
                o.ExpiresAt,
                o.Status,
                o.UserId,
                o.Total,
                User = o.User == null ? null : new { o.User.Id, o.User.Email },
                Items = o.Items.Select(i => new { i.Id, i.ProductId, i.Quantity, i.UnitPrice })
            })
            .ToListAsync();
        return Ok(orders);
    }

    // GET: api/orders/5 (populate all properties)
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetOrder(int id)
    {
        var now = DateTime.UtcNow;
        var order = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.Items)
            .Include(o => o.Payment)
            .Include(o => o.Shipping)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
            return NotFound();
        if (order.Status == OrderStatus.Draft && order.CreatedAt < now.AddHours(-24))
            return NotFound();

        // Restrict access: only owner or admin
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var isAdmin = User.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;
        bool isOwner = userIdClaim != null && int.TryParse(userIdClaim, out int userId) && order.UserId == userId;
        bool isAdminUser = isAdmin == "True" || isAdmin == "true";

        if (!isOwner && !isAdminUser)
            return Unauthorized();

        // Populate Product for each OrderItem
        var productIds = order.Items.Select(i => i.ProductId).ToList();
        var products = await _context.Products
            .Include(p => p.Categories)
            .Where(p => productIds.Contains(p.Id))
            .ToListAsync();

        return Ok(new
        {
            order.Id,
            order.CreatedAt,
            order.ExpiresAt,
            Status = order.Status.ToString(),
            order.UserId,
            order.Total,
            User = order.User == null ? null : new { order.User.Id, order.User.Email },
            Items = order.Items.Select(i => new
            {
                i.Id,
                i.ProductId,
                i.Quantity,
                i.UnitPrice,
                Product = products.FirstOrDefault(p => p.Id == i.ProductId) == null ? null : new
                {
                    Id = i.ProductId,
                    Name = products.FirstOrDefault(p => p.Id == i.ProductId)?.Name,
                    Description = products.FirstOrDefault(p => p.Id == i.ProductId)?.Description,
                    Price = products.FirstOrDefault(p => p.Id == i.ProductId)?.Price,
                    Stock = products.FirstOrDefault(p => p.Id == i.ProductId)?.Stock,
                    SvgType = products.FirstOrDefault(p => p.Id == i.ProductId)?.SvgType,
                    Categories = products.FirstOrDefault(p => p.Id == i.ProductId)?.Categories.Select(c => new { c.Id, c.Name })
                }
            }),
            Payment = order.Payment == null ? null : new
            {
                order.Payment.Id,
                Method = order.Payment.Method.ToString(),
                Status = order.Payment.Status.ToString(),
                order.Payment.PaidAt,
            },
            Shipping = order.Shipping == null ? null : new
            {
                order.Shipping.Id,
                order.Shipping.FirstName,
                order.Shipping.LastName,
                order.Shipping.AddressLineOne,
                order.Shipping.AddressLineTwo,
                order.Shipping.City,
                order.Shipping.PostalCode,
                order.Shipping.Country,
                order.Shipping.TrackingNumber,
                Method = order.Shipping.Method.ToString()
            },
        });
    }

    // POST: api/orders
    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(Order order)
    {
        // Status defaults to Draft (model default)
        order.Status = OrderStatus.Draft;
        order.ExpiresAt = DateTime.UtcNow.AddHours(24);
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    // PUT: api/orders/5 
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, Order order)
    {
        if (id != order.Id)
            return BadRequest();

        // Only logged in users can set status to Pending which is the "fake" version of checking out.
        if (order.Status != OrderStatus.Draft)
        {
            if (!User.Identity?.IsAuthenticated ?? true)
                return Unauthorized();
        }

        // Remove items with zero quantity
        if (order.Items != null)
        {
            order.Items = order.Items.Where(i => i.Quantity > 0).ToList();
        }

        // Fetch existing order from DB
        var existingOrder = await _context.Orders
            .Include(o => o.Items)
            .Include(o => o.Payment)
            .Include(o => o.Shipping)
            .FirstOrDefaultAsync(o => o.Id == id);
        if (existingOrder == null)
            return NotFound();

        // Update scalar properties
        existingOrder.Status = order.Status;
        existingOrder.ExpiresAt = order.Status == OrderStatus.Draft ? DateTime.UtcNow.AddHours(24) : order.ExpiresAt;

        // Update OrderItems
        if (order.Items != null)
        {
            // Remove items not in new list
            var itemIds = order.Items.Where(i => i.Id != 0).Select(i => i.Id).ToHashSet();
            var itemsToRemove = existingOrder.Items.Where(i => !itemIds.Contains(i.Id)).ToList();
            foreach (var item in itemsToRemove)
                _context.OrderItems.Remove(item);

            // Update or add items
            foreach (var item in order.Items)
            {
                var existingItem = existingOrder.Items.FirstOrDefault(i => i.Id == item.Id);
                if (existingItem != null)
                {
                    existingItem.ProductId = item.ProductId;
                    existingItem.Quantity = item.Quantity;
                    existingItem.UnitPrice = item.UnitPrice;
                }
                else
                {
                    item.OrderId = existingOrder.Id;
                    _context.OrderItems.Add(item);
                }
            }
        }

        // Update Payment
        if (order.Payment != null)
        {
            if (existingOrder.Payment == null)
            {
                order.Payment.OrderId = existingOrder.Id;
                _context.Payments.Add(order.Payment);
            }
            else
            {
                existingOrder.Payment.Method = order.Payment.Method;
                existingOrder.Payment.Status = order.Payment.Status;
                existingOrder.Payment.PaidAt = order.Payment.PaidAt;
                existingOrder.Payment.StripePaymentIntentId = order.Payment.StripePaymentIntentId;
            }
        }

        // Update Shipping
        if (order.Shipping != null)
        {
            if (existingOrder.Shipping == null)
            {
                order.Shipping.OrderId = existingOrder.Id;
                _context.Shippings.Add(order.Shipping);
            }
            else
            {
                existingOrder.Shipping.FirstName = order.Shipping.FirstName;
                existingOrder.Shipping.LastName = order.Shipping.LastName;
                existingOrder.Shipping.AddressLineOne = order.Shipping.AddressLineOne;
                existingOrder.Shipping.AddressLineTwo = order.Shipping.AddressLineTwo;
                existingOrder.Shipping.City = order.Shipping.City;
                existingOrder.Shipping.PostalCode = order.Shipping.PostalCode;
                existingOrder.Shipping.Method = order.Shipping.Method;
                existingOrder.Shipping.TrackingNumber = order.Shipping.TrackingNumber;
                existingOrder.Shipping.Country = order.Shipping.Country;

            }
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Orders.Any(e => e.Id == id))
                return NotFound();
            else
                throw;
        }
        return NoContent();
    }

    // DELETE: api/orders/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
            return NotFound();
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
