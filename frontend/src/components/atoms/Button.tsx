import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary px-5 py-3 text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90',
        secondary:
          'bg-secondary px-5 py-3 text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-border bg-transparent px-5 py-3 text-foreground hover:bg-card',
        ghost:
          'px-4 py-3 text-muted-foreground hover:bg-card hover:text-foreground',
      },
      size: {
        default: 'min-h-11',
        sm: 'min-h-9 px-3 py-2 text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = ({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: TButtonProps) => {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  )
}
