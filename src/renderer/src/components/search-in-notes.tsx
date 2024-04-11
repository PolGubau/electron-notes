import { Input } from 'pol-ui'
import { useState } from 'react'
export const SearchInNotes = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-4 w-full">
      <Input
        type="text"
        placeholder="Search in notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
