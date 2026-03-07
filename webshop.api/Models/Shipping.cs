public class Shipping
{
    public Shipping()
    {
        // Automatically generate a tracking number
        TrackingNumber = Guid.NewGuid().ToString();
    }
    public int Id { get; set; }
    public required string LastName { get; set; }

    public required string FirstName { get; set; }
    public required string AddressLineOne { get; set; }
    public string? AddressLineTwo { get; set; }
    public required string City { get; set; }
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
    public string? TrackingNumber { get; set; }
    public ShippingMethod Method { get; set; } = ShippingMethod.PostNord;

    public int OrderId { get; set; }
}


public enum ShippingMethod
{
    PostNord,
    DHL,
    Bring,
}