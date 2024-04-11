import {
  Content,
  DraggableTopBar,
  EmptyNote,
  FloatingNoteTitle,
  MarkdownEditor,
  RootLayout,
  Sidebar
} from '@/components'
import { useAtomValue } from 'jotai'
import { PoluiProvider } from 'pol-ui'
import { useRef } from 'react'
import TitleInput from './components/title-input/title-input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from './components/ui/resizeable/resizeable'
import { selectedNoteAtom } from './store/store'

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
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={30} minSize={20}>
              <Sidebar resetScroll={resetScroll} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70} minSize={40}>
              <Content
                ref={contentContainerRef}
                className="border-l bg-neutral-800/50 border-l-white/20 dark:bg-neutral-800 dark:border-l-black/20"
              >
                {selectedNote ? (
                  <>
                    <FloatingNoteTitle className="pt-2" />
                    <TitleInput value={selectedNote.title} />
                    <MarkdownEditor />
                  </>
                ) : (
                  <EmptyNote />
                )}
              </Content>
            </ResizablePanel>
          </ResizablePanelGroup>
        </RootLayout>
      </main>
    </PoluiProvider>
  )
}

export default App
