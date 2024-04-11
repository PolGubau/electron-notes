import { createEmptyNoteAtom } from '@renderer/store/store'
import { useSetAtom } from 'jotai'

const useNote = () => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const createNote = async () => {
    await createEmptyNote()
  }
  return { createNote }
}

export default useNote
