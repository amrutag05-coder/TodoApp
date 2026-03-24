import { useState, useEffect } from 'react'

function TaskForm({ onSubmit, editingTask, onCancel, email, defaultDueDate }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        assignedToEmail: email || ''
    })

    useEffect(() => {
        if (editingTask) {
            setForm({
                title: editingTask.title || '',
                description: editingTask.description || '',
                priority: editingTask.priority || 'Medium',
                dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
                assignedToEmail: editingTask.assignedToEmail || ''
            })
        } else {
            setForm({
                title: '',
                description: '',
                priority: 'Medium',
                dueDate: defaultDueDate || '',
                assignedToEmail: email || ''
            })
        }
    }, [editingTask, email, defaultDueDate])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.title.trim()) return alert('Title is required')
        onSubmit(form)
        setForm({
            title: '',
            description: '',
            priority: 'Medium',
            dueDate: '',
            assignedToEmail: ''
        })
    }
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {editingTask ? '✏️ Edit Task' : '➕ Add New Task'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    name="title"
                    placeholder="Task title *"
                    value={form.title}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="description"
                    placeholder="Description (optional)"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 font-medium">⚡ Priority</label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        >
                            <option value="Low">🟢 Low</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="High">🔴 High</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-500 font-medium">📅 Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <input
                    type="email"
                    name="assignedToEmail"
                    placeholder="👤 Assign to email (optional)"
                    value={form.assignedToEmail}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        {editingTask ? 'Update Task' : 'Add Task'}
                    </button>
                    {(editingTask || true) && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    )

}

export default TaskForm