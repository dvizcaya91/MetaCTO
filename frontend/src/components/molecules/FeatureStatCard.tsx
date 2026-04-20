interface IFeatureStatCardProps {
  label: string
  value: string
}

export const FeatureStatCard = ({ label, value }: IFeatureStatCardProps) => (
  <div className="rounded-[1.75rem] border border-border/70 bg-card/80 p-5 backdrop-blur">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {label}
    </p>
    <p className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
      {value}
    </p>
  </div>
)
