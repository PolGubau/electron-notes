import useNote from '@renderer/hooks/useNote'
import { formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ColorsEnum, IconButton, OverrideProps, Popover, cn } from 'pol-ui'
import React from 'react'
import { TbDotsVertical } from 'react-icons/tb'
export type NotePreviewProps = OverrideProps<
  React.HTMLAttributes<HTMLButtonElement>,
  NoteInfo & {
    isActive: boolean
  }
>

export const NotePreview = ({
  title,
  lastEditTime,
  isActive = false,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)

  const { deleteNoteByTitle, duplicateNote } = useNote()

  const deleteNote = () => {
    deleteNoteByTitle(title)
  }
  const handleDuplicate = () => {
    duplicateNote(title)
  }

  return (
    <li
      className={cn('flex items-center gap-1 p-1', {
        'bg-transparent': !isActive,
        'bg-secondary-100 dark:bg-secondary-700 text-white cursor-default': isActive
      })}
    >
      <button
        color={ColorsEnum.secondary}
        className={cn('cursor-pointer p-1.5 w-full text-start', props.className)}
        {...props}
      >
        <h3 className="font-bold truncate">{title}</h3>
        <span className="inline-block w-full text-xs font-light text-left">{date}</span>
      </button>
      <Popover
        hasCloseButton={false}
        className="p-0 dark:bg-secondary-800"
        rounded="xl"
        trigger={
          <IconButton className="text-secondary-50">
            <TbDotsVertical />
          </IconButton>
        }
      >
        <ul className="divide-y divide-neutral-200 dark:divide-secondary-800 ">
          <button
            className="w-full p-2 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-900 rounded-xl transition-colors"
            onClick={handleDuplicate}
          >
            Duplicate
          </button>
          <button
            className="w-full p-2 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-900 rounded-xl transition-colors"
            onClick={deleteNote}
          >
            Delete
          </button>
        </ul>
      </Popover>
    </li>
  )
}
