import {
  createEmptyNoteAtom,
  deleteNoteByTitleAtom,
  deleteSelectedNoteAtom,
  duplicateNoteAtom
} from '@renderer/store/store'
import { useSetAtom } from 'jotai'

const useNote = () => {
  // #region Create

  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const createNote = async () => {
    await createEmptyNote()
  }

  // #region Delete
  const deleteNoteFn = useSetAtom(deleteSelectedNoteAtom)
  const deleteNoteByTitleFn = useSetAtom(deleteNoteByTitleAtom)

  const deleteSelectedNote = async () => {
    await deleteNoteFn()
  }

  const deleteNoteByTitle = async (title: string) => {
    await deleteNoteByTitleFn(title)
  }

  const duplicateNoteFn = useSetAtom(duplicateNoteAtom)

  const duplicateNote = async (title: string) => {
    await duplicateNoteFn(title)
  }

  return { createNote, deleteSelectedNote, deleteNoteByTitle, duplicateNote }
}

export default useNote
