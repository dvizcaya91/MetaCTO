import { ShieldCheck } from 'lucide-react'

import { Badge } from '@/components/atoms/Badge'

interface IAuthShowcaseProps {
  description: string
  eyebrow: string
  highlights: string[]
  title: string
}

export const AuthShowcase = ({
  description,
  eyebrow,
  highlights,
  title,
}: IAuthShowcaseProps) => (
  <section className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 p-8 shadow-[0_32px_120px_-48px_rgba(0,117,255,0.5)] backdrop-blur-2xl">
    <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
    <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-accent/20 blur-3xl" />
    <div className="relative space-y-6">
      <Badge variant="primary">{eyebrow}</Badge>
      <div className="space-y-4">
        <h1 className="max-w-xl text-5xl font-black leading-none tracking-[-0.05em] text-foreground md:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4 text-sm leading-6 text-foreground/90"
            key={highlight}
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/12 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <p>{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
