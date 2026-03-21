using Microsoft.AspNetCore.Mvc;
using TodoApi.Constants;
using TodoApi.Models;
using TodoApi.Repositories;

namespace TodoApi.Controllers;

/// <summary>
/// Handles all HTTP requests for todo tasks
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoRepository _repository;

    public TodoController(ITodoRepository repository)
    {
        _repository = repository;
    }

    /// <summary>
    /// Retrieves tasks - all, by creator email, or assigned to email
    /// </summary>
    /// <param name="email">Optional email to filter tasks</param>
    /// <param name="assigned">If true returns tasks assigned to email</param>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? email,
        [FromQuery] bool? assigned)
    {
        if (!string.IsNullOrWhiteSpace(email) && assigned == true)
        {
            var assignedTasks = await _repository.GetAssignedToAsync(email);
            return Ok(assignedTasks);
        }

        if (!string.IsNullOrWhiteSpace(email))
        {
            var myTasks = await _repository.GetMyTasksAsync(email);
            return Ok(myTasks);
        }

        var allTasks = await _repository.GetAllAsync();
        return Ok(allTasks);
    }

    /// <summary>
    /// Retrieves a single task by its unique identifier
    /// </summary>
    /// <param name="id">The unique task ID</param>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (id <= 0)
            return BadRequest(ErrorMessages.InvalidId);

        var task = await _repository.GetByIdAsync(id);

        if (task == null)
            return NotFound(ErrorMessages.TaskNotFound);

        return Ok(task);
    }

    /// <summary>
    /// Creates a new task
    /// </summary>
    /// <param name="task">The task to create</param>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TodoTask task)
    {
        if (task == null)
            return BadRequest(ErrorMessages.TaskCannotBeNull);

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _repository.CreateAsync(task);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
    /// <summary>
    /// Updates an existing task
    /// </summary>
    /// <param name="id">Task ID to update</param>
    /// <param name="task">Updated task data</param>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TodoTask task)
    {
        if (id <= 0)
            return BadRequest(ErrorMessages.InvalidId);

        if (task == null)
            return BadRequest(ErrorMessages.TaskCannotBeNull);

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        task.Id = id;
        var updated = await _repository.UpdateAsync(task);

        if (updated == null)
            return NotFound(ErrorMessages.TaskNotFound);

        return Ok(updated);
    }
    /// <summary>
    /// Deletes a task by ID
    /// </summary>
    /// <param name="id">Task ID to delete</param>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0)
            return BadRequest(ErrorMessages.InvalidId);

        var deleted = await _repository.DeleteAsync(id);

        if (!deleted)
            return NotFound(ErrorMessages.TaskNotFound);

        return NoContent();
    }
    /// <summary>
    /// Toggles completion status of a task
    /// </summary>
    /// <param name="id">Task ID to toggle</param>
    [HttpPatch("{id}/complete")]
    public async Task<IActionResult> ToggleComplete(int id)
    {
        if (id <= 0)
            return BadRequest(ErrorMessages.InvalidId);

        var toggled = await _repository.ToggleCompleteAsync(id);

        if (!toggled)
            return NotFound(ErrorMessages.TaskNotFound);

        return NoContent();
    }
}