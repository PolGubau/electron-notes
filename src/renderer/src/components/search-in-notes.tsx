import { useState } from 'react'
const SearchInNotes = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-4 w-full">
      <input
        type="text"
        placeholder="Search in notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-secondary-50 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-200"
      />
    </div>
  )
}

export default SearchInNotes
