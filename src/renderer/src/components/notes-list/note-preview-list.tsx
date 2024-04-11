import { useNotesList } from '@/hooks/useNotesList'
import { isEmpty } from 'lodash'
import { cn } from 'pol-ui'
import { ComponentProps } from 'react'
import { NotePreview } from './note-preview'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  if (!notes) return null

  if (isEmpty(notes)) {
    return (
      <ul className={cn('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul
      className={cn(
        'divide-y divide-secondary-200 dark:divide-secondary-700 border-y border-secondary-200 dark:border-secondary-700',
        className
      )}
      {...props}
    >
      {notes.map((note, index) => {
        return (
          <NotePreview
            key={note.title}
            {...note}
            isActive={index === selectedNoteIndex}
            onClick={handleNoteSelect(index)}
          />
        )
      })}
    </ul>
  )
}
