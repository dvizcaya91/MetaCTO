import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.16em] uppercase',
  {
    variants: {
      variant: {
        primary: 'border-primary/25 bg-primary/12 text-primary',
        secondary: 'border-border/80 bg-card/80 text-foreground',
        subtle: 'border-transparent bg-secondary text-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  },
)

type TBadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>

export const Badge = ({ className, variant, ...props }: TBadgeProps) => (
  <div className={cn(badgeVariants({ className, variant }))} {...props} />
)
