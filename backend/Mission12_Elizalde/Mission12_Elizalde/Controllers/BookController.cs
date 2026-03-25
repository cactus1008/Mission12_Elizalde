using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Elizalde.Data;

namespace Mission11_Elizalde.Controllers
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
        public IActionResult Get(int pageSize = 5, int pageNum = 1, string sort = "none")
        {
            // Make sure i can sort by title in both ascending and descending order
            var query = _context.Books.AsQueryable();

            // Sorting logic
            if (sort == "title_asc")
            {
                query = query.OrderBy(b => b.Title);
            }
            else if (sort == "title_desc")
            {
                query = query.OrderByDescending(b => b.Title);
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
    }
}
