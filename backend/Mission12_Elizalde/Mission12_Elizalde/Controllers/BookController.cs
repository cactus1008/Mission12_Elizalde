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

        [HttpGet("AllBooks")]
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

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("EditBook/{id}")]
        public IActionResult EditBook(int id, [FromBody] Book updatedBook)
        {
            var book = _context.Books.Find(id);

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Publisher = updatedBook.Publisher;
            book.ISBN = updatedBook.ISBN;
            book.Classification = updatedBook.Classification;
            book.Category = updatedBook.Category;
            book.PageCount = updatedBook.PageCount;
            book.Price = updatedBook.Price;

            _context.Books.Update(book);
            _context.SaveChanges();
            return Ok(book);
        }

        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)        {
            var book = _context.Books.Find(id);
            if (book == null)
            {
                return NotFound(new { message = $"Book with ID {id} not found." });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
