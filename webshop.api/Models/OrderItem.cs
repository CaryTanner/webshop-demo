public class OrderItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }  // snapshot of price at time of order

    public int OrderId { get; set; }
    public required Order Order { get; set; }

    public required int ProductId { get; set; }
    public required Product Product { get; set; }
}