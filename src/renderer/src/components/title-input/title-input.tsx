import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

interface TitleInputProps {
  value: string
}

const TitleInput = ({ value }: TitleInputProps) => {
  const { autoSaveTitle, handleTitleBlur } = useMarkdownEditor()
  return (
    <input
      onChange={(e) => autoSaveTitle(e.target.value)}
      onBlur={handleTitleBlur}
      className="outline-none text-2xl px-8 pt-8 caret-primary bg-transparent w-full"
      value={value}
    />
  )
}

export default TitleInput
