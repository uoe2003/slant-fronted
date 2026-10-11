import { AppDrawer, AppDrawerContent } from "@/components/AppDrawer";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { PlayerProfile } from "../types";
import { EditProfileForm } from "./EditProfileForm";

interface EditProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: PlayerProfile;
  onSave: (profile: PlayerProfile) => void;
}

export function EditProfileDrawer({
  open,
  onOpenChange,
  profile,
  onSave,
}: EditProfileDrawerProps) {
  return (
    <AppDrawer open={open} onOpenChange={onOpenChange}>
      <AppDrawerContent closeLabel="Cerrar">
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
      </AppDrawerContent>
    </AppDrawer>
  );
}
