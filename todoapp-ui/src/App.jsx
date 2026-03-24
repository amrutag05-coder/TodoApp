import { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import { getTasks, getDueToday, getDelegated, createTask, updateTask, deleteTask, toggleComplete } from './services/taskService'

function App() {
  const [tasks, setTasks] = useState([])
  const [email, setEmail] = useState('')
  const [started, setStarted] = useState(false)
  const [activeFilter, setActiveFilter] = useState('due-today')
  const [editingTask, setEditingTask] = useState(null)
  const [planningToday, setPlanningToday] = useState(false)
  const [error, setError] = useState(null)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (started) fetchTasks()
  }, [email, activeFilter, started])

  const fetchTasks = async () => {
    try {
      let data = []
      if (activeFilter === 'due-today') {
        data = await getDueToday()
      } else if (activeFilter === 'delegated') {
        data = await getDelegated(email)
      } else {
        data = await getTasks(email)
      }
      setTasks(data)
      setError(null)
    } catch (err) {
      setError('Failed to load tasks. Please try again.')
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, {
          ...formData,
          id: editingTask.id,
          createdAt: editingTask.createdAt,
          createdByEmail: editingTask.createdByEmail
        })
        setEditingTask(null)
      } else {
        await createTask({ ...formData, createdByEmail: email })
      }
      setPlanningToday(false)
      fetchTasks()
    } catch (err) {
      setError('Failed to save task. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      fetchTasks()
    } catch (err) {
      setError('Failed to delete task.')
    }
  }

  const handleToggle = async (id) => {
    try {
      await toggleComplete(id)
      fetchTasks()
    } catch (err) {
      setError('Failed to update task.')
    }
  }

  const handleSwitch = () => {
    setStarted(false)
    setEmail('')
    setTasks([])
    setEditingTask(null)
    setPlanningToday(false)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header email={email} onSwitch={handleSwitch} />
      <main className="max-w-3xl mx-auto px-4 py-8">

        {!started ? (
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevents page reload
              setStarted(true);
            }}
            className="text-center py-24 flex flex-col items-center gap-4"
          >
            <p className="text-6xl">📋</p>
            <h2 className="text-3xl font-bold text-gray-700">Welcome to TodoApp</h2>
            <p className="text-gray-400 max-w-md">
              Your personal task manager — create, delegate and track your daily tasks
            </p>

            <input
              required
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Notice: onKeyDown is gone! The form handles "Enter" now.
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Let's Begin! 🚀
            </button>
          </form>
        ) : (
          // Main app
          <>
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            {(planningToday || editingTask) && (
              <TaskForm
                onSubmit={handleSubmit}
                editingTask={editingTask}
                onCancel={() => {
                  setEditingTask(null)
                  setPlanningToday(false)
                }}
                email={email}
                defaultDueDate={planningToday ? today : ''}
              />
            )}
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onPlanToday={() => {
                setPlanningToday(true)
                setActiveFilter('due-today')
              }}
            />
            <TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onEdit={setEditingTask}
              onToggle={handleToggle}
            />
          </>
        )}

      </main>
    </div>
  )
}

export default App