import { HANDLERS } from '@shared/constants'
import {
  CreateNote,
  DeleteNote,
  DuplicateNote,
  GetNotes,
  ReadNote,
  RenameNote,
  WriteNote
} from '@shared/types'
import {
  createNote,
  deleteNote,
  duplicateNote,
  getNotes,
  readNote,
  renameNote,
  writeNote
} from './lib'

export const handlers = {
  [HANDLERS.GET_NOTES]: (_, ...args: Parameters<GetNotes>) => getNotes(...args),
  [HANDLERS.READ_NOTE]: (_, ...args: Parameters<ReadNote>) => readNote(...args),
  [HANDLERS.WRITE_NOTE]: (_, ...args: Parameters<WriteNote>) => writeNote(...args),
  [HANDLERS.CREATE_NOTE]: (_, ...args: Parameters<CreateNote>) => createNote(...args),
  [HANDLERS.DELETE_NOTE]: (_, ...args: Parameters<DeleteNote>) => deleteNote(...args),
  [HANDLERS.DUPLICATE_NOTE]: (_, ...args: Parameters<DuplicateNote>) => duplicateNote(...args),
  [HANDLERS.RENAME_NOTE]: (_, ...args: Parameters<RenameNote>) => renameNote(...args)
}
