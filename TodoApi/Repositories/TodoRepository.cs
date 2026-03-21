using Microsoft.EntityFrameworkCore;
using TodoApi.Constants;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <inheritdoc />
    public async Task<TodoTask> CreateAsync(TodoTask task)
    {
        if (task == null)
            throw new ArgumentNullException(nameof(task), ErrorMessages.TaskCannotBeNull);

        if (string.IsNullOrWhiteSpace(task.Title))
            throw new ArgumentException(ErrorMessages.TaskTitleRequired, nameof(task));

        task.CreatedAt = DateTime.UtcNow;
        task.IsCompleted = false;

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    /// <inheritdoc />
    public async Task<bool> DeleteAsync(int id)
    {
        if (id < 0)
            throw new ArgumentException(ErrorMessages.InvalidId, nameof(id));

        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<TodoTask>> GetAllAsync()
    {
        return await _context.Tasks.
            OrderByDescending(task => task.CreatedAt)
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<IEnumerable<TodoTask>> GetAssignedToAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentNullException(nameof(email), ErrorMessages.EmailRequired);

        return await _context.Tasks.
            Where(task => string.Equals(task.AssignedToEmail, email, StringComparison.OrdinalIgnoreCase))
            .OrderBy(task => task.DueDate)
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<TodoTask?> GetByIdAsync(int id)
    {
        if (id < 0)
            throw new ArgumentException(ErrorMessages.InvalidId, nameof(id));

        return await _context.Tasks
            .FindAsync(id);
    }

    /// <inheritdoc />
    public async Task<IEnumerable<TodoTask>> GetDueTodayAsync()
    {
        var today = DateTime.UtcNow.Date;
        var tomorrow = today.AddDays(1);

        return await _context.Tasks
            .Where(t => !t.IsCompleted
                && t.DueDate.HasValue
                && t.DueDate >= today
                && t.DueDate < tomorrow)
            .OrderBy(t => t.DueDate)
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<IEnumerable<TodoTask>> GetMyTasksAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentNullException(nameof(email), ErrorMessages.EmailRequired);

        return await _context.Tasks
            .Where(t => string.Equals(t.CreatedByEmail, email, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<bool> ToggleCompleteAsync(int id)
    {
        if (id < 0)
            throw new ArgumentException(ErrorMessages.InvalidId, nameof(id));

        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            return false;

        task.IsCompleted = !task.IsCompleted;
        await _context.SaveChangesAsync();
        return true;
    }

    /// <inheritdoc />
    public async Task<TodoTask?> UpdateAsync(TodoTask task)
    {
        if (task == null)
            throw new ArgumentNullException(nameof(task), ErrorMessages.TaskCannotBeNull);

        if (string.IsNullOrWhiteSpace(task.Title))
            throw new ArgumentException(ErrorMessages.TaskTitleRequired, nameof(task));

        var existingTask = await _context.Tasks.FindAsync(task.Id);
        if (existingTask == null)
            return null;

        existingTask.Title = task.Title;
        existingTask.Description = task.Description;
        existingTask.DueDate = task.DueDate;
        existingTask.AssignedToEmail = task.AssignedToEmail;
        existingTask.IsCompleted = task.IsCompleted;
        existingTask.Priority = task.Priority;
        existingTask.ReminderAt = task.ReminderAt;

        await _context.SaveChangesAsync();
        return existingTask;
    }
}