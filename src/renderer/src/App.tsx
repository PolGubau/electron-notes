import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import { useAtomValue } from 'jotai'
import { PoluiProvider } from 'pol-ui'
import { useRef } from 'react'
import SearchInNotes from './components/search-in-notes'
import { selectedNoteAtom } from './store'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }
  const selectedNote = useAtomValue(selectedNoteAtom)

  return (
    <PoluiProvider>
      <main className="bg-neutral-50 dark:bg-neutral-900/70">
        <DraggableTopBar />
        <RootLayout>
          <Sidebar className="p-2">
            <ActionButtonsRow className="flex justify-between mt-1" />
            <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
          </Sidebar>

          <Content
            ref={contentContainerRef}
            className="border-l bg-neutral-800/50 border-l-white/20 dark:bg-neutral-800 dark:border-l-black/20"
          >
            <FloatingNoteTitle className="pt-2" />
            {selectedNote && <SearchInNotes />} <MarkdownEditor />
          </Content>
        </RootLayout>
      </main>
    </PoluiProvider>
  )
}

export default App
