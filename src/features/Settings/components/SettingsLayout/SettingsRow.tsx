import { useId, type ReactNode } from "react";

interface SettingsRowBaseProps {
  label: string;
  description?: string;
  children: ReactNode;
}

type SettingsRowProps = SettingsRowBaseProps &
  (
    | {
        stacked?: false;
        value?: never;
      }
    | {
        /** Places the control below the label, for wide controls such as sliders. */
        stacked: true;
        /** Current value shown next to the label. */
        value?: string;
      }
  );

export function SettingsRow({
  label,
  description,
  value,
  stacked = false,
  children,
}: SettingsRowProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-description` : undefined;

  const text = (
    <div className="min-w-0">
      <p id={labelId} className="text-[15px] font-medium text-slate-100">
        {label}
      </p>
      {description && (
        <p id={descriptionId} className="mt-0.5 text-[13px] text-slate-400">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      className={
        stacked
          ? "px-4 py-3.5"
          : "flex min-h-14 items-center justify-between gap-4 px-4 py-3"
      }
    >
      {stacked ? (
        <>
          <div className="mb-2 flex items-baseline justify-between gap-4">
            {text}
            {value && (
              <span className="text-sm text-cyan-300 tabular-nums">
                {value}
              </span>
            )}
          </div>
          {children}
        </>
      ) : (
        <>
          {text}
          <div className="shrink-0">{children}</div>
        </>
      )}
    </div>
  );
}
