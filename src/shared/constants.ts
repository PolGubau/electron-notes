export const appDirectoryName = 'notes'
export const fileEncoding = 'utf8'

export const autoSavingTime = 3000
export const welcomeNoteFilename = 'Welcome.md'

export enum HANDLERS {
  GET_NOTES = 'GET_NOTES',
  READ_NOTE = 'READ_NOTE',
  WRITE_NOTE = 'WRITE_NOTE',
  CREATE_NOTE = 'CREATE_NOTE',
  DELETE_NOTE = 'DELETE_NOTE',
  DUPLICATE_NOTE = 'DUPLICATE_NOTE',
  RENAME_NOTE = 'RENAME_NOTE'
}
