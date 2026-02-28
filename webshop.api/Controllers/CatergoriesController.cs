using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CatergoriesController : ControllerBase
{
    private readonly WebshopContext _context;

    public CatergoriesController(WebshopContext context)
    {
        _context = context;
    }

    // GET: api/catergories
    [HttpGet]
    public ActionResult<IEnumerable<object>> GetCategories()
    {
        var categories = _context.Categories
            .Select(c => new { c.Id, c.Name })
            .ToList();
        return Ok(categories);
    }
}
