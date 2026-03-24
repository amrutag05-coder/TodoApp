function TaskCard({ task, onDelete, onEdit, onToggle }) {
 const isOverdue = task.dueDate &&
    !task.isCompleted &&
    new Date(task.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))

  const formatDate = (date) => {
    if (!date) return null
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const priorityColors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700'
  }

  return (
    <div className={`bg-white rounded-xl border p-5 mb-3 shadow-sm transition-all ${
      task.isCompleted ? 'opacity-60 border-gray-200' : 'border-gray-200 hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">

          <button
            onClick={() => onToggle(task.id)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              task.isCompleted
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {task.isCompleted && <span className="text-white text-xs">✓</span>}
          </button>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              {isOverdue && (
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-red-100 text-red-700">
                  ⚠️ Overdue
                </span>
              )}
            </div>

            <h3 className={`font-semibold text-gray-800 mb-1 ${
              task.isCompleted ? 'line-through text-gray-400' : ''
            }`}>
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-gray-500 mb-2">{task.description}</p>
            )}

            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              {task.dueDate && <span>📅 Due: {formatDate(task.dueDate)}</span>}
              {task.assignedToEmail && <span>👤 {task.assignedToEmail}</span>}
              {task.createdByEmail && <span>✍️ {task.createdByEmail}</span>}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard