import { formatDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { Button, ButtonProps, ColorsEnum, cn } from 'pol-ui'
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

  return (
    <Button
      disabled={isActive}
      innerClassname="text-secondary-50 w-full align-normal justify-normal items-start flex flex-col opacity-100 transition-color"
      color={ColorsEnum.secondary}
      className={cn(
        'cursor-pointer p-1.5 w-full',
        {
          'bg-transparent ': !isActive,
          'bg-secondary-100 dark:bg-secondary-700 text-white cursor-default': isActive
        },

        className
      )}
      {...props}
    >
      <h3 className="font-bold truncate">{title}</h3>
      <span className="inline-block w-full text-xs font-light text-left">{date}</span>
    </Button>
  )
}

