
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly WebshopContext _context;

    public ProductsController(WebshopContext context)
    {
        _context = context;
    }

    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
        string? search = null,
        string? sortBy = null,
        bool? inStock = null,
        [FromQuery] List<int>? categoryIds = null,
        int skip = 0,
        int limit = 20)
    {
        var products = _context.Products
            .Include(p => p.Categories)
            .AsQueryable();
        if (categoryIds != null && categoryIds.Count > 0)
        {
            products = products.Where(p => p.Categories.Any(c => categoryIds.Contains(c.Id)));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            products = products.Where(p => p.Name.Contains(search));
        }

        if (inStock == true)
        {
            products = products.Where(p => p.Stock > 0);
        }

        products = sortBy switch
        {
            "name" => products.OrderBy(p => p.Name),
            "price" => products.OrderBy(p => p.Price),
            _ => products
        };

        var paged = products.Skip(skip).Take(limit);
        return await paged.ToListAsync();
    }

    // GET: api/products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetProduct(int id)
    {
        var product = await _context.Products
            .Include(p => p.Categories)
            .FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        // Project to anonymous object with SvgType as string
        return new
        {
            product.Id,
            product.Name,
            product.Description,
            product.Price,
            product.Stock,
            SvgType = product.SvgType.ToString(),
            Categories = product.Categories.Select(c => new { c.Id, c.Name }).ToList(),
            product.OrderItems
        };
    }

    // POST: api/products
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized();

        var IsAdmin = User.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;
        if (IsAdmin != "True" && IsAdmin != "true")
            return Unauthorized();

        // Attach existing categories instead of inserting new ones
        if (product.Categories != null && product.Categories.Count > 0)
        {
            var categoryIds = product.Categories.Select(c => c.Id).ToList();
            product.Categories = await _context.Categories
                .Where(c => categoryIds.Contains(c.Id))
                .ToListAsync();
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // PUT: api/products/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product)
    {
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized();

        var IsAdmin = User.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;
        if (IsAdmin != "True" && IsAdmin != "true")
            return Unauthorized();

        if (id != product.Id)
        {
            return BadRequest();
        }
        _context.Entry(product).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Products.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    // DELETE: api/products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized();

        var IsAdmin = User.Claims.FirstOrDefault(c => c.Type == "IsAdmin")?.Value;
        if (IsAdmin != "True" && IsAdmin != "true")
            return Unauthorized();

        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
