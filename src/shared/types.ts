import { NoteContent, NoteInfo } from './models'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = (title?: NoteInfo['title']) => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
export type DuplicateNote = (title: NoteInfo['title']) => Promise<NoteInfo['title'] | false>
export type RenameNote = (
  oldTitle: NoteInfo['title'],
  newTitle: NoteInfo['title']
) => Promise<boolean>
