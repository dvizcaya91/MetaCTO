import { cn } from '@/lib/utils'

type TSkeletonProps = React.HTMLAttributes<HTMLDivElement>

export const Skeleton = ({ className, ...props }: TSkeletonProps) => (
  <div
    className={cn(
      'animate-pulse rounded-3xl bg-gradient-to-r from-secondary via-card to-secondary',
      className,
    )}
    {...props}
  />
)
