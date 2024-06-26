import { cn } from 'pol-ui'
import { ComponentProps, forwardRef } from 'react'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={cn('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-auto h-full', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
