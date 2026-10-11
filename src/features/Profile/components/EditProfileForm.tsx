import type { FormEvent } from "react";
import { AppButton } from "@/components/AppButton";
import { AppDrawerBody } from "@/components/AppDrawer";
import { AppTextField } from "@/components/AppTextField";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import type { AvatarId, PlayerProfile } from "../types";
import { AvatarPicker } from "./AvatarPicker";

interface EditProfileFormProps {
  profile: PlayerProfile;
  onSave: (profile: PlayerProfile) => void;
  onDone: () => void;
}

// Mounted only while the drawer is open, so every opening starts from the saved profile
export function EditProfileForm({
  profile,
  onSave,
  onDone,
}: EditProfileFormProps) {
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
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <AppDrawerBody className="gap-5 pt-2">
        <AvatarPicker defaultValue={profile.avatarId} />

        <AppTextField
          label="Nombre"
          name="displayName"
          defaultValue={profile.displayName}
          required
          maxLength={16}
          pattern="\S.*\S"
          title="Entre 2 y 16 caracteres, sin espacios al principio ni al final"
          autoComplete="off"
        />

        <AppTextField
          label="Frase"
          name="tagline"
          defaultValue={profile.tagline}
          maxLength={40}
          placeholder="Opcional"
          autoComplete="off"
        />
      </AppDrawerBody>

      <DrawerFooter className="grid grid-cols-2 gap-3">
        <DrawerClose
          render={<AppButton type="button" variant="secondary" size="lg" />}
        >
          Cancelar
        </DrawerClose>
        <AppButton type="submit" size="lg">
          Guardar cambios
        </AppButton>
      </DrawerFooter>
    </form>
  );
}
