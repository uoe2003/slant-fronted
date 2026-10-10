import { useEffect, useRef } from "react";

interface ColorSwatchProps {
  groupName: string;
  label: string;
  color: string;
  selected: boolean;
  onSelect: () => void;
}

export function ColorSwatch({
  groupName,
  label,
  color,
  selected,
  onSelect,
}: ColorSwatchProps) {
  const ref = useRef<HTMLLabelElement>(null);

  // Keep the selected swatch visible when it starts outside the scroll area.
  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ inline: "nearest", block: "nearest" });
    }
  }, [selected]);

  return (
    <label ref={ref} className="relative shrink-0 snap-start">
      <input
        type="radio"
        name={groupName}
        checked={selected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        style={{ backgroundColor: color }}
        className="block size-7 rounded-full outline-2 outline-offset-2 outline-transparent transition-[outline-color,transform] peer-checked:outline-white peer-focus-visible:outline-white active:scale-95"
      >
        <span className="sr-only">{label}</span>
      </span>
    </label>
  );
}
