import { selectedNoteAtom } from '@renderer/store/store'
import { useAtomValue } from 'jotai'
import { cn } from 'pol-ui'
import { ComponentProps } from 'react'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (!selectedNote) return null

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <span className="text-secondary">{selectedNote.title}</span>
    </div>
  )
}
