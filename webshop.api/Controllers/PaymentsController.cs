using Microsoft.AspNetCore.Mvc;
using Stripe;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public PaymentsController(IConfiguration configuration)
    {
        StripeConfiguration.ApiKey = configuration["Stripe:SecretKey"];
        _configuration = configuration;
    }
    // POST: api/payments/create-payment-intent
    [HttpPost("create-payment-intent")]
    public async Task<ActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentRequest request)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(request.Amount * 100), // Stripe uses smallest currency unit
            Currency = "eur",
            PaymentMethodTypes = new List<string> { "card" },
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        return Ok(new
        {
            clientSecret = paymentIntent.ClientSecret,
            paymentIntentId = paymentIntent.Id,
            publishableKey = _configuration["Stripe:PublishableKey"]
        });
    }
}

public class CreatePaymentIntentRequest
{
    public decimal Amount { get; set; }
}