import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlayerProfile } from "../types";

interface ProfileState {
  profile: PlayerProfile;
  updateProfile: (profile: PlayerProfile) => void;
}

export const DEFAULT_PROFILE: PlayerProfile = {
  displayName: "Jugador",
  tagline: "",
  avatarId: "rocket",
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      updateProfile: (profile) => set({ profile }),
    }),
    { name: "profile-store" },
  ),
);
