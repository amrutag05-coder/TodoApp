function FilterBar({ activeFilter, onFilterChange, onPlanToday }) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      <button
        onClick={() => onFilterChange('due-today')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === 'due-today'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        📅 Due Today
      </button>
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        📋 All Tasks
      </button>
      <button
        onClick={() => onFilterChange('delegated')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === 'delegated'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        🤝 Delegated
      </button>
      <button
        onClick={onPlanToday}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition-colors ml-auto"
      >
        ➕ Add New Task
      </button>
    </div>
  )
}

export default FilterBar