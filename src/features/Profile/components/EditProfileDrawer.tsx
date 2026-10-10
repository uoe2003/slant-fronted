import { useId, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AVATARS } from "../consts/avatars";
import type { AvatarId, PlayerProfile } from "../types";

const INPUT_CLASS =
  "h-12 rounded-xl border-theme-50/10 bg-theme-50/4 px-4 text-theme-50 placeholder:text-theme-500 focus-visible:border-theme-300 focus-visible:ring-theme-300/30";
const LABEL_CLASS = "text-[13px] font-medium text-theme-300";

interface EditProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: PlayerProfile;
  onSave: (profile: PlayerProfile) => void;
}

interface EditProfileFormProps {
  profile: PlayerProfile;
  onSave: (profile: PlayerProfile) => void;
  onDone: () => void;
}

// Mounted only while the drawer is open, so every opening starts from the saved profile
function EditProfileForm({ profile, onSave, onDone }: EditProfileFormProps) {
  const id = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    onSave({
      displayName: String(data.get("displayName")).trim(),
      tagline: String(data.get("tagline")).trim(),
      avatarId: data.get("avatarId") as AvatarId,
    });
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-4">
      <fieldset>
        <legend className={`mb-2 ${LABEL_CLASS}`}>Avatar</legend>
        <div className="grid grid-cols-6 gap-2">
          {AVATARS.map(({ id: avatarId, label, icon: Icon }) => (
            <label key={avatarId} className="relative">
              <input
                type="radio"
                name="avatarId"
                value={avatarId}
                defaultChecked={avatarId === profile.avatarId}
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

      <div className="space-y-2">
        <Label htmlFor={`${id}-name`} className={LABEL_CLASS}>
          Nombre
        </Label>
        <Input
          id={`${id}-name`}
          name="displayName"
          defaultValue={profile.displayName}
          required
          maxLength={16}
          pattern="\S.*\S"
          title="Entre 2 y 16 caracteres, sin espacios al principio ni al final"
          autoComplete="off"
          className={INPUT_CLASS}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-tagline`} className={LABEL_CLASS}>
          Frase
        </Label>
        <Input
          id={`${id}-tagline`}
          name="tagline"
          defaultValue={profile.tagline}
          maxLength={40}
          placeholder="Opcional"
          autoComplete="off"
          className={INPUT_CLASS}
        />
      </div>

      <DrawerFooter className="grid grid-cols-2 gap-3 px-0 pt-1">
        <DrawerClose>
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-2xl border-theme-50/10 bg-theme-50/4 text-[15px] font-semibold text-theme-100 hover:bg-theme-50/10 hover:text-theme-100"
          >
            Cancelar
          </Button>
        </DrawerClose>
        <Button
          type="submit"
          className="h-12 rounded-2xl bg-theme-300 text-[15px] font-semibold text-theme-950 hover:bg-theme-200"
        >
          Guardar cambios
        </Button>
      </DrawerFooter>
    </form>
  );
}

export function EditProfileDrawer({
  open,
  onOpenChange,
  profile,
  onSave,
}: EditProfileDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-180 border-theme-50/10 bg-theme-950 pb-[env(safe-area-inset-bottom)] text-theme-100">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-bold text-theme-50">
            Editar perfil
          </DrawerTitle>
          <DrawerDescription className="text-theme-500">
            Cambia tu avatar, tu nombre y tu frase.
          </DrawerDescription>
        </DrawerHeader>
        <EditProfileForm
          profile={profile}
          onSave={onSave}
          onDone={() => onOpenChange(false)}
        />
      </DrawerContent>
    </Drawer>
  );
}
