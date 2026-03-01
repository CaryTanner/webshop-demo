
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly WebshopContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(WebshopContext context, IConfiguration configuration, ILogger<AuthController> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized("Invalid email or password");

        var tokenResult = GenerateToken(user);
        return Ok(new
        {
            token = tokenResult.Token,
            expiresAt = tokenResult.ExpiresAt,
            IsAdmin = user.IsAdmin,
            email = user.Email,
            userId = user.Id
        });
    }

    private TokenResult GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("IsAdmin", user.IsAdmin.ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expiresAt = DateTime.UtcNow.AddHours(8);
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );

        return new TokenResult
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expiresAt
        };
    }

    private class TokenResult
    {
        public required string Token { get; set; }
        public required DateTime ExpiresAt { get; set; }
    }
    [HttpGet("test-jwt")]
    public IActionResult TestJwt()
    {
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized("JWT not present or invalid");

        var userId = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var email = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Email)?.Value;
        var isAdmin = User.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;

        _logger.LogInformation("TestJwt called. User info: userId={UserId}, email={Email}, isAdmin={IsAdmin}", userId, email, isAdmin);

        return Ok(new
        {
            message = "JWT is valid and received!",
            userId,
            email,
            isAdmin
        });
    }
}

public class LoginRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}