export interface SegmentedOption<T> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-grid auto-cols-fr grid-flow-col rounded-xl bg-black/30 p-1"
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`min-h-9 rounded-lg px-3 text-sm font-medium transition-colors
              ${selected ? "bg-white/15 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
