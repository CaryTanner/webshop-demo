public class Payment
{
    public int Id { get; set; }
    public PaymentMethod Method { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public required string StripePaymentIntentId { get; set; }
    public DateTime? PaidAt { get; set; }
    public required int OrderId { get; set; }
}
public enum PaymentMethod
{
    card,
    klarna,
}

public enum PaymentStatus
{
    Pending,
    Completed,
    Failed,
    Refunded
}