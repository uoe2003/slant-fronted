import { AVATARS } from "../consts/avatars";
import type { AvatarId } from "../types";

interface AvatarPickerProps {
  defaultValue: AvatarId;
}

export function AvatarPicker({ defaultValue }: AvatarPickerProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-[13px] font-medium text-theme-300">
        Avatar
      </legend>
      <div className="grid grid-cols-6 gap-2">
        {AVATARS.map(({ id, label, icon: Icon }) => (
          <label key={id} className="relative">
            <input
              type="radio"
              name="avatarId"
              value={id}
              defaultChecked={id === defaultValue}
              className="peer sr-only"
            />
            <span className="grid aspect-square cursor-pointer place-items-center rounded-2xl border border-theme-50/10 bg-theme-50/4 text-theme-400 transition active:scale-90 peer-checked:border-theme-300 peer-checked:bg-theme-300/15 peer-checked:text-theme-200 peer-focus-visible:ring-2 peer-focus-visible:ring-theme-300">
              <Icon className="size-6" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
