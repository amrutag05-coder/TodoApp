using TodoApi.Models;

namespace TodoApi.Repositories;

/// <summary>
/// Contract defining all task data operations
/// Any class implementing this must provide these methods
/// </summary>
public interface ITodoRepository
{
    /// <summary>
    /// Retrieves all tasks in the system, ordered by creation date (newest first)
    /// </summary>
    /// <returns>A list of all tasks</returns>
    Task<IEnumerable<TodoTask>> GetAllAsync();

    /// <summary>
    /// Retrieves a single task by its unique identifier
    /// </summary>
    /// <param name="id">Task identifier</param>
    /// <returns>Specific task</returns>
    /// <exception cref="ArgumentException">Thrown when an invalid ID is provided</exception>
    Task<TodoTask?> GetByIdAsync(int id);

    /// <summary>
    /// Retrieves all incomplete tasks that are due within the next 24 hours, ordered by due date (soonest first)
    /// </summary>
    /// <returns>Tasks due soon</returns>
    Task<IEnumerable<TodoTask>> GetDueTodayAsync();

    /// <summary>
    /// Retrieves all tasks assigned to a specific user, ordered by due date (soonest first)
    /// </summary>
    /// <param name="email">Email of the task creator</param>
    /// <returns>Tasks whose AssignedToEmail matches the provided email</returns>
    /// <exception cref="ArgumentNullException">Thrown when email is null or empty</exception>
    Task<IEnumerable<TodoTask>> GetAssignedToAsync(string email);

    /// <summary>
    /// Retrieves all tasks created by a specific user
    /// </summary>
    /// <param name="email">Email of the task creator</param>
    /// <returns>Tasks created by the specified user, ordered by creation date (newest first)</returns>
    /// <exception cref="ArgumentNullException">Thrown when email is null or empty</exception>

    Task<IEnumerable<TodoTask>> GetMyTasksAsync(string email);

    /// <summary>
    /// Creates a new task in the system
    /// </summary>
    /// <param name="task">The task object to create</param>
    /// <returns>The created task with assigned ID and timestamps</returns>
    /// <exception cref="ArgumentNullException">Thrown when task is null</exception>
    /// <exception cref="ArgumentException">Thrown when task title is null or empty</exception>
    Task<TodoTask> CreateAsync(TodoTask task);

    /// <summary>
    /// Updates an existing task in the system
    /// </summary>
    /// <param name="task">The task to update</param>
    /// <returns>The updated task</returns>
    /// <exception cref="NotImplementedException"></exception>
    Task<TodoTask?> UpdateAsync(TodoTask task);

    /// <summary>
    /// Deletes a task from the system
    /// </summary>
    /// <param name="id">Task identifier</param>
    /// <returns>True if the task was deleted, false otherwise</returns>
    /// <exception cref="ArgumentException">Thrown when an invalid ID is provided</exception>
    Task<bool> DeleteAsync(int id);

    /// <summary>
    /// Toggles the completion status of a task (if completed, mark as incomplete; if incomplete, mark as completed)
    /// </summary>
    /// <param name="id">Task identifier</param>
    /// <returns>True if the task was toggled, false otherwise</returns>
    /// <exception cref="ArgumentException">Thrown when an invalid ID is provided</exception>
    Task<bool> ToggleCompleteAsync(int id);
}