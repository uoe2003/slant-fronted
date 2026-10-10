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
        className="px-1 text-base font-semibold tracking-wider text-theme-200 uppercase"
      >
        {title}
      </h2>
      <div className="divide-y divide-theme-50/6 overflow-hidden rounded-2xl border border-theme-50/10 bg-theme-50/4 backdrop-blur-sm">
        {children}
      </div>
    </section>
  );
}
