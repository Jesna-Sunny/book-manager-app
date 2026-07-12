using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using BookApi.Data;
using BookApi.Models;
using System.Security.Claims;

namespace BookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    private async Task<int?> GetCurrentUserId()
    {
        var username = User.FindFirstValue(ClaimTypes.Name);
        if (username == null) return null;

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        return user?.Id;
    }

    // GET: api/books
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        var userId = await GetCurrentUserId();
        if (userId == null) return Unauthorized();

        return await _context.Books.Where(b => b.UserId == userId).ToListAsync();
    }

    // GET: api/books/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var userId = await GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

        if (book == null)
        {
            return NotFound();
        }

        return book;
    }

    // POST: api/books
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook(Book book)
    {
        var userId = await GetCurrentUserId();
        if (userId == null) return Unauthorized();

        book.UserId = userId.Value;
        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    // PUT: api/books/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, Book book)
    {
        var userId = await GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var existingBook = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
        if (existingBook == null)
        {
            return NotFound();
        }

        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.PublicationDate = book.PublicationDate;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/books/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var userId = await GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);
        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}