import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNewTitleAtom, saveNoteAtom, selectedNoteAtom } from '@renderer/store/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const saveNoteTitle = useSetAtom(saveNewTitleAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return

      console.info('Auto saving:', selectedNote.title)

      await saveNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content)
    }
  }

  const autoSaveTitle = async (title: string) => {
    if (!selectedNote) return

    console.info('Auto title saving:', selectedNote.title)

    await saveNoteTitle(title)
  }

  const handleTitleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const title = editorRef.current?.getMarkdown()

    if (title != null) {
      await saveNote(title)
    }
  }

  return {
    editorRef,
    selectedNote,
    handleAutoSaving,
    handleBlur,
    autoSaveTitle,
    handleTitleBlur
  }
}
