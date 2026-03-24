function Header({ email, onSwitch }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
        </div>
        {email && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              👤 {email}
            </span>
            <button
              onClick={onSwitch}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Switch User
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header