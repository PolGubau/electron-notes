import { NotePreviewList } from '@renderer/components/notes-list/note-preview-list'
import useNote from '@renderer/hooks/useNote'
import { IconButton, cn } from 'pol-ui'
import { ComponentProps } from 'react'
import { TbPlus } from 'react-icons/tb'

interface SidebarProps extends ComponentProps<'aside'> {
  resetScroll: () => void
}

export const Sidebar = ({ className, resetScroll, ...props }: SidebarProps) => {
  const { createNote } = useNote()
  return (
    <aside className={cn('w-full h-[100vh + 10px] overflow-auto', className)} {...props}>
      <div>
        <header className="flex justify-between items-center">
          <h4 className="p-4 text-lg">Notes</h4>
          <IconButton onClick={createNote} className="text-secondary-50 bg-secondary-50/10">
            <TbPlus />
          </IconButton>
        </header>
        <NotePreviewList
          className="divide-y divide-secondary-200 dark:divide-secondary-700 border-y border-secondary-200 dark:border-secondary-700"
          onSelect={resetScroll}
        />{' '}
      </div>
    </aside>
  )
}
