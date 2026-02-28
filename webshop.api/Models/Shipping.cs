public class Shipping
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public required string Address { get; set; }
    public required string City { get; set; }
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
    public string? TrackingNumber { get; set; }
    public ShippingMethod Method { get; set; } = ShippingMethod.PostNord;

    public int OrderId { get; set; }
    public required Order Order { get; set; }
}

public enum ShippingMethod
{
    PostNord,
    DHL,
    Bring,
}