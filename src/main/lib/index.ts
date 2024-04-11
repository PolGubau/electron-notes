import { appDirectoryName, fileEncoding, welcomeNoteFilename } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import {
  CreateNote,
  DeleteNote,
  DuplicateNote,
  GetNotes,
  ReadNote,
  RenameNote,
  WriteNote
} from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readFile, readdir, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return `${homedir()}/pol-apps/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    // create the welcome note
    await writeFile(`${rootDir}/${welcomeNoteFilename}`, content, { encoding: fileEncoding })

    notes.push(welcomeNoteFilename)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  console.info(`Writing note ${filename}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async (title?: string) => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const getNewNotePath = async () => {
    // create a new note called untitled but if it already exists, create a new note with a number suffix

    const name = title ?? 'Untitled'

    const newNotePath = `${rootDir}/${name}.md`
    const isPathExists = await stat(newNotePath).catch(() => false)

    if (!isPathExists) {
      return newNotePath
    }

    let i = 1
    while (i <= 1000) {
      const newNotePath = `${rootDir}/Untitled-${i}.md`
      const isPathExists = await stat(newNotePath).catch(() => false)

      if (!isPathExists) {
        return newNotePath
      }

      i++

      if (i > 1000) {
        throw new Error('Too many notes with the same name')
      }
    }
    return false
  }
  const filePath = await getNewNotePath()

  if (!filePath) {
    dialog.showErrorBox(
      'Creation failed',
      `All notes must be saved under ${
        rootDir.endsWith('/') ? rootDir : `${rootDir}/`
      }. Avoid using other directories!`
    )
    return false
  }
  const { name: filename, dir: parentDir } = path.parse(filePath)

  // In windows some problems could occur because rootDir uses \ and parentDir uses /, so we need to replace them

  const normalizeSlashes = (str: string) => str.replace(/\\/g, '/')

  const parentDirNormalized = normalizeSlashes(parentDir)

  const rootDirNormalized = normalizeSlashes(rootDir)

  if (parentDirNormalized !== rootDirNormalized) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under "${rootDir}".
      Avoid using other directories!`
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, 'Edit me!', { encoding: fileEncoding })

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'], // 0 is Delete, 1 is Cancel
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}

export const duplicateNote: DuplicateNote = async (filename) => {
  const rootDir = getRootDir()

  const newFilename = `${filename}-copy`

  console.info(`Duplicating note: ${filename} to ${newFilename}`)
  await writeFile(`${rootDir}/${newFilename}.md`, await readNote(filename), {
    encoding: fileEncoding
  })

  return newFilename
}

export const renameNote: RenameNote = async (oldFilename: string, newFilename: string) => {
  // take the note with the old name and rename it to the new name, if the name already exists, return false

  const rootDir = getRootDir()

  const oldPath = `${rootDir}/${oldFilename}.md`
  const newPath = `${rootDir}/${newFilename}.md`

  const isPathExists = await stat(newPath).catch(() => false)

  if (isPathExists) {
    dialog.showErrorBox('Rename failed', `A note with the name ${newFilename} already exists`)
    return false
  }

  console.info(`Renaming note: ${oldFilename} to ${newFilename}`)
  writeFile(newPath, await readNote(oldFilename), { encoding: fileEncoding })

  // delete the old note

  await remove(oldPath)
  return true
}
