import { Pencil, Settings } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAvatar } from "../consts/avatars";
import type { PlayerProfile } from "../types";
import { formatNumber } from "../utils/format";
import { LevelRing } from "./LevelRing";

interface ProfileHeaderProps {
  profile: PlayerProfile;
  level: number;
  xp: number;
  xpToNextLevel: number;
  onEdit: () => void;
}

export function ProfileHeader({
  profile,
  level,
  xp,
  xpToNextLevel,
  onEdit,
}: ProfileHeaderProps) {
  const { icon: AvatarIcon } = getAvatar(profile.avatarId);
  const progress = Math.min(xp / xpToNextLevel, 1);
  const xpMissing = Math.max(xpToNextLevel - xp, 0);

  return (
    <div className="relative rounded-3xl border border-theme-50/10 bg-theme-50/4 px-5 pt-8 pb-5 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 size-11 rounded-full text-theme-300 hover:bg-theme-50/10 hover:text-theme-300"
      >
        <Link to="/settings" aria-label="Ajustes">
          <Settings className="size-6" />
        </Link>
      </Button>

      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <LevelRing progress={progress}>
            <Avatar className="size-24 bg-theme-400/15 ring-1 ring-theme-50/10 ring-inset">
              <AvatarFallback className="bg-transparent text-theme-200">
                <AvatarIcon className="size-11" aria-hidden="true" />
              </AvatarFallback>
            </Avatar>
          </LevelRing>
          <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-theme-300 px-3 py-1 text-xs font-bold text-theme-950 tabular-nums shadow-lg hover:bg-theme-300">
            Nv. {level}
          </Badge>
        </div>

        <h1 className="mt-6 max-w-full truncate text-2xl font-bold tracking-tight text-theme-50">
          {profile.displayName}
        </h1>
        {profile.tagline && (
          <p className="mt-1 max-w-full truncate text-sm text-theme-400">
            {profile.tagline}
          </p>
        )}

        <p className="mt-4 text-sm font-medium text-theme-300 tabular-nums">
          {formatNumber(xp)} / {formatNumber(xpToNextLevel)} XP
        </p>
        <p className="mt-0.5 text-[13px] text-theme-500">
          Te faltan {formatNumber(xpMissing)} XP para el nivel {level + 1}
        </p>
      </div>

      <Button
        type="button"
        onClick={onEdit}
        aria-haspopup="dialog"
        className="mt-5 h-12 w-full rounded-2xl bg-theme-300 text-[15px] font-semibold text-theme-950 transition hover:bg-theme-200 active:scale-[0.98]"
      >
        <Pencil className="size-[18px]" aria-hidden="true" />
        Editar perfil
      </Button>
    </div>
  );
}
