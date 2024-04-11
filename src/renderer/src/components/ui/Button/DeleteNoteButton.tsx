import { deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { ColorsEnum, IconButton, IconButtonProps } from 'pol-ui'
import { TbTrash } from 'react-icons/tb'

export const DeleteNoteButton = ({ ...props }: IconButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDelete = async () => {
    await deleteNote()
  }

  return (
    <IconButton onClick={handleDelete} {...props} color={ColorsEnum.error}>
      <TbTrash />
    </IconButton>
  )
}
