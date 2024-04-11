import useNote from '@renderer/hooks/useNote'
import { formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ButtonProps, ColorsEnum, IconButton, Popover, cn } from 'pol-ui'
import useRipple from 'pol-ui/lib/esm/hooks/use-ripple/use-ripple'
import { TbDotsVertical } from 'react-icons/tb'
export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ButtonProps

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = formatDateFromMs(lastEditTime)
  const [ref, event] = useRipple()
  const { deleteNoteByTitle, duplicateNote } = useNote()
  const deleteNote = () => {
    deleteNoteByTitle(title)
  }
  const handleDuplicate = () => {
    duplicateNote(title)
  }

  return (
    <li
      ref={ref}
      {...event}
      className={cn('flex items-center gap-1 p-1', {
        'bg-transparent': !isActive,
        'bg-secondary-100 dark:bg-secondary-700 text-white cursor-default': isActive
      })}
    >
      <button
        onClick={props.onClick}
        color={ColorsEnum.secondary}
        className={cn(
          'cursor-pointer p-1.5 w-full text-start',

          className
        )}
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
