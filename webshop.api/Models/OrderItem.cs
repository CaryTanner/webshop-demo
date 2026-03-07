public class OrderItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }  // price at time of order

    public int OrderId { get; set; }
    public required int ProductId { get; set; }
}