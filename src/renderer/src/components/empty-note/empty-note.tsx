import useNote from '@renderer/hooks/useNote'
import { Button } from 'pol-ui'

export const EmptyNote = () => {
  const { createNote } = useNote()

  return (
    <section className="grid place-items-center h-full p-10">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-2xl font-bold text-center text-balance">
          Select a note to start editing
        </h1>
        <p className="text-center text-neutral-500 dark:text-neutral-400 mt-2 text-pretty">
          Or create a new note by clicking the{' '}
          <span className="text-primary-400 dark:text-primary-500">New Note</span> button
        </p>
        <Button onClick={createNote} className="mt-4">
          New Note
        </Button>
      </div>
    </section>
  )
}
