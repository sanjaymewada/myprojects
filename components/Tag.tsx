import { cn } from '../lib/utils'

interface TagProps {
  text: string
  className?: string
}

export default function Tag({ text, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg bg-primary-100/10 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10',
        'dark:bg-primary-400/10 dark:text-primary-400 dark:ring-primary-400/20',
        'transition-colors duration-200',
        'hover:bg-primary-100/20 dark:hover:bg-primary-400/20',
        className
      )}
    >
      {text}
    </span>
  )
}
