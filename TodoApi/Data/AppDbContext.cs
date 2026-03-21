using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data;

    /// <summary>
    /// EF Core DbContext for the Todo API
    /// Manages database connections and entity sets
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet representing the collection of Task entities in the database
        public DbSet<TodoTask> Tasks { get; set; } = null!;
    }
