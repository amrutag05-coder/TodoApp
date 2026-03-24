import TaskCard from './TaskCard'

function TaskList({ tasks, onDelete, onEdit, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default TaskList