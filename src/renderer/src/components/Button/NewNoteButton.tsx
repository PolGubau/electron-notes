import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { ColorsEnum, IconButton, IconButtonProps } from 'pol-ui'
import { TbPlus } from 'react-icons/tb'

export const NewNoteButton = ({ ...props }: IconButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }

  return (
    <IconButton color={ColorsEnum.secondary} onClick={handleCreation} {...props}>
      <TbPlus />
    </IconButton>
  )
}
