const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:5270/api/todo';

// Get my tasks by email
export const getTasks = async (email) => {
    if (!email) return [];
    const response = await fetch(`${API_BASE_URL}?email=${email}`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

// Get tasks due today
export const getDueToday = async () => {
    const response = await fetch(`${BASE_URL}/due-today`);
    if (!response.ok) throw new Error('Failed to fetch due today tasks');
    return response.json();
};

// Get delegated tasks
export const getDelegated = async (email) => {
    if (!email) return [];
    const response = await fetch(`${BASE_URL}/delegated?email=${email}`);
    if (!response.ok) throw new Error('Failed to fetch delegated tasks');
    return response.json();
};

// Create task
export const createTask = async (task) => {
    const cleanTask = {
        ...task,
        dueDate: task.dueDate || null,
        reminderAt: task.reminderAt || null,
        assignedToEmail: task.assignedToEmail || null
    }
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanTask)
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

// Update task
export const updateTask = async (id, task) => {
    const cleanTask = {
        ...task,
        dueDate: task.dueDate || null,
        reminderAt: task.reminderAt || null,
        assignedToEmail: task.assignedToEmail || null
    }
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanTask)
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

// Delete task
export const deleteTask = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
};

// Toggle complete
export const toggleComplete = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}/complete`, {
        method: 'PATCH'
    });
    if (!response.ok) throw new Error('Failed to toggle task');
};