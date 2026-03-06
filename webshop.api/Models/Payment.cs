public class Payment
{
    public int Id { get; set; }
    public PaymentMethod Method { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public DateTime? PaidAt { get; set; }

    public required int OrderId { get; set; }
    public required Order Order { get; set; }
    public bool PaymentOnDelivery { get; set; } = false;
}
public enum PaymentMethod
{
    Klarna,
    Stripe,
    PayPal,
}

public enum PaymentStatus
{
    Pending,
    Completed,
    Failed,
    Refunded
}