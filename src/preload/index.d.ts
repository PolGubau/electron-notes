import {
  CreateNote,
  DeleteNote,
  DuplicateNote,
  GetNotes,
  ReadNote,
  RenameNote,
  WriteNote
} from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      duplicateNote: DuplicateNote
      renameNote: RenameNote
    }
  }
}
