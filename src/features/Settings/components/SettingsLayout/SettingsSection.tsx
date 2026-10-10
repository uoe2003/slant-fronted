import { useId, type ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="space-y-3">
      <h2
        id={headingId}
        className="px-1 text-sm font-medium tracking-wider text-slate-400 uppercase"
      >
        {title}
      </h2>
      <div className="divide-y divide-white/6 overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm">
        {children}
      </div>
    </section>
  );
}
