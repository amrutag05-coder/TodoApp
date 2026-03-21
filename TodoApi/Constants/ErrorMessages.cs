namespace TodoApi.Constants;

/// <summary>
/// Centralised error messages used across the application
/// </summary>
public static class ErrorMessages
{
    // Task errors
    public const string TaskNotFound = "Task not found";
    public const string TaskCannotBeNull = "Task cannot be null";
    public const string TaskTitleRequired = "Title is required";
    public const string TaskTitleTooLong = "Title cannot exceed 200 characters";
    public const string TaskDescriptionTooLong = "Description cannot exceed 1000 characters";
    public const string TaskPriorityInvalid = "Priority must be Low, Medium or High";

    // Email errors
    public const string EmailRequired = "Email cannot be null or empty";
    public const string EmailInvalid = "Must be a valid email address";

    // General errors
    public const string InvalidId = "Invalid ID provided";
}