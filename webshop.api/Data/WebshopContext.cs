using Microsoft.EntityFrameworkCore;
public class WebshopContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Shipping> Shippings { get; set; }

    public WebshopContext(DbContextOptions<WebshopContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Email = "admin.one@cgitest.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                IsAdmin = true
            }
        );
    }
}