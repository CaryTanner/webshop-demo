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
                User = o.User == null ? null : new { o.User.Id, o.User.Email },
                Items = o.Items.Select(i => new { i.Id, i.ProductId, i.Quantity, i.UnitPrice })
            })
            .ToListAsync();
        return Ok(orders);
    }

    // GET: api/orders/5 (populate all properties)
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
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
        return order;
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
            var itemsToRemove = order.Items.Where(i => i.Quantity == 0).ToList();
            foreach (var item in itemsToRemove)
            {
                _context.OrderItems.Remove(item);
            }
            order.Items = order.Items.Where(i => i.Quantity > 0).ToList();
        }

        // Reset ExpiresAt if order is still Draft
        if (order.Status == OrderStatus.Draft)
        {
            order.ExpiresAt = DateTime.UtcNow.AddHours(24);
        }

        _context.Entry(order).State = EntityState.Modified;
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
