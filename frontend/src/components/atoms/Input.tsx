import { cn } from '@/lib/utils'

type TInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, ...props }: TInputProps) => (
  <input
    className={cn(
      'flex h-12 w-full rounded-2xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
      className,
    )}
    {...props}
  />
)
