using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OrderItemsController : ControllerBase
{
    private readonly WebshopContext _context;

    public OrderItemsController(WebshopContext context)
    {
        _context = context;
    }

    // PUT: api/orderitems/{orderId}/{itemId}/quantity
    [HttpPut("{orderId}/{itemId}/quantity")]
    public async Task<IActionResult> UpdateOrderItemQuantity(int orderId, int itemId, [FromBody] int quantity)
    {
        var order = await _context.Orders.Include(o => o.Items).FirstOrDefaultAsync(o => o.Id == orderId);
        if (order == null)
            return NotFound(new { message = "Order not found" });

        var item = order.Items.FirstOrDefault(i => i.Id == itemId);
        if (item == null)
            return NotFound(new { message = "Order item not found" });

        if (quantity <= 0)
        {
            _context.OrderItems.Remove(item);
        }
        else
        {
            item.Quantity = quantity;
        }
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
