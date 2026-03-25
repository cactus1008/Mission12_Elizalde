using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission12_Elizalde.Data;

namespace Mission12_Elizalde.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;

        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet]
        // Take in page size, page number, and sort order as query parameters
        public IActionResult Get(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {
            // Make sure i can sort by title in both ascending and descending order
            var query = _context.Books.AsQueryable();

            // Sorting logic
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Get the total count of books before pagination
            var booksTotal = query.Count();

            // Apply pagination
            var data = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return an IActionResult that includes both the list of books and the total count of books
            var listInfo = new
            {
                booksList = data,
                totalBooks = booksTotal
            };

            return Ok(listInfo);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes() { 
            var bookTypes = _context.Books.Select(b => b.Category).Distinct().ToList();
            return Ok(bookTypes);
        }
    }
}
