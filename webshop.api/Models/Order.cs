public class Order
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ExpiresAt { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Draft;

    public int? UserId { get; set; }
    public User? User { get; set; }

    public List<OrderItem> Items { get; set; } = new();

    public Payment? Payment { get; set; }

    public Shipping? Shipping { get; set; }

    public decimal Total => Items.Sum(i => i.Quantity * i.UnitPrice);
}

public enum OrderStatus
{
    Draft, //shopping cart ref
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}