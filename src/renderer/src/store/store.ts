import { NoteContent, NoteInfo } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // sort them by most recently edited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  const noteContent = await window.context.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  // save on disk
  await window.context.writeNote(selectedNote.title, newContent)

  // update the saved note's last edit time
  set(
    notesAtom,
    notes.map((note) => {
      // this is the note that we want to update
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }

      return note
    })
  )
})

export const saveNewTitleAtom = atom(null, async (get, set, newTitle: string) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  console.log('newTitle' + newTitle)

  if (!selectedNote || !notes) return

  // rename the file on disk
  const isRenamed = await window.context.renameNote(selectedNote.title, newTitle)

  if (!isRenamed) return

  // update the saved note's title
  set(
    notesAtom,
    notes.map((note) => {
      // this is the note that we want to update
      if (note.title === selectedNote.title) {
        return {
          ...note,
          title: newTitle
        }
      }

      return note
    })
  )
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const title = await window.context.createNote()

  if (!title) return

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

  set(selectedNoteIndexAtom, 0)
})

export const deleteSelectedNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)

  if (!isDeleted) return

  // filter out the deleted note
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  // de select any note
  set(selectedNoteIndexAtom, null)
})

export const deleteNoteByTitleAtom = atom(null, async (get, set, title: string) => {
  const notes = get(notesAtom)

  if (!notes) return

  const isDeleted = await window.context.deleteNote(title)

  if (!isDeleted) return

  // filter out the deleted note
  set(
    notesAtom,
    notes.filter((note) => note.title !== title)
  )
})
export const duplicateNoteAtom = atom(null, async (get, set, title: string) => {
  const notes = get(notesAtom)
  if (!notes) return
  const note = notes.find((note) => note.title === title) // find the note
  if (!note) return

  const newTitle = await window.context.duplicateNote(title) // duplicate the note and get the new title
  if (!newTitle) return
  const newNote: NoteInfo = {
    title: newTitle,
    lastEditTime: Date.now()
  }
  set(notesAtom, [newNote, ...notes])
  set(selectedNoteIndexAtom, 0)
  return newTitle // return the new title
})
