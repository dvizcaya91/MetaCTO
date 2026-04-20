import { cn } from '@/lib/utils'

type TLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export const Label = ({ className, ...props }: TLabelProps) => (
  <label
    className={cn(
      'text-sm font-semibold tracking-[0.02em] text-foreground',
      className,
    )}
    {...props}
  />
)
