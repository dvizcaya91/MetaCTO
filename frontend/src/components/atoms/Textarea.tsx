import { cn } from '@/lib/utils'

type TTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({ className, ...props }: TTextareaProps) => (
  <textarea
    className={cn(
      'flex min-h-36 w-full rounded-[1.5rem] border border-input bg-background/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
      className,
    )}
    {...props}
  />
)
