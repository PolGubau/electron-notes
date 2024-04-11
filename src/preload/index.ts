import {
  CreateNote,
  DeleteNote,
  DuplicateNote,
  GetNotes,
  ReadNote,
  RenameNote,
  WriteNote
} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'
export enum HANDLERS {
  GET_NOTES = 'GET_NOTES',
  READ_NOTE = 'READ_NOTE',
  WRITE_NOTE = 'WRITE_NOTE',
  CREATE_NOTE = 'CREATE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  DUPLICATE_NOTE = 'DUPLICATE_NOTE',
  RENAME_NOTE = 'RENAME_NOTE'
}

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,

    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke(HANDLERS.GET_NOTES, ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke(HANDLERS.READ_NOTE, ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke(HANDLERS.WRITE_NOTE, ...args),
    createNote: (...args: Parameters<CreateNote>) =>
      ipcRenderer.invoke(HANDLERS.CREATE_NOTE, ...args),
    deleteNote: (...args: Parameters<DeleteNote>) =>
      ipcRenderer.invoke(HANDLERS.DELETE_NOTE, ...args),

    duplicateNote: (...args: Parameters<DuplicateNote>) =>
      ipcRenderer.invoke(HANDLERS.DUPLICATE_NOTE, ...args),
    renameNote: (...args: Parameters<RenameNote>) =>
      ipcRenderer.invoke(HANDLERS.RENAME_NOTE, ...args)
  })
} catch (error) {
  console.error(error)
}
