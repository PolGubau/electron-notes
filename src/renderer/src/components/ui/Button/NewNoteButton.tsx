import useNote from '@renderer/hooks/useNote'
import { ColorsEnum, IconButton, IconButtonProps, cn } from 'pol-ui'
import { TbPlus } from 'react-icons/tb'

export const NewNoteButton = ({ ...props }: IconButtonProps) => {
  const { createNote } = useNote()

  return (
    <IconButton
      color={ColorsEnum.secondary}
      onClick={createNote}
      {...props}
      className={cn('dark:text-secondary-50', props.className)}
    >
      <TbPlus />
    </IconButton>
  )
}
