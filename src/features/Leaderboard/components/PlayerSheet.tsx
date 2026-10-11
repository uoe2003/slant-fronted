import type { ReactNode } from "react";
import { Flame, Gamepad2, Star, Swords, Trophy } from "lucide-react";
import { AppButton } from "@/components/AppButton";
import {
  AppDrawer,
  AppDrawerBody,
  AppDrawerContent,
} from "@/components/AppDrawer";
import { GlassCard } from "@/components/GlassCard";
import { UserAvatar } from "@/components/UserAvatar";
import {
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import type { LeagueConfig, Player } from "../types";
import { RankTrend } from "./RankTrend";
import { StatRow } from "./StatRow";

interface PlayerSheetProps {
  player: Player | null;
  league: LeagueConfig;
  open: boolean;
  isCurrentUser: boolean;
  onOpenChange: (open: boolean) => void;
  onChallenge: (player: Player) => void;
}

function SummaryCell({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 py-2.5">
      <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-xl font-black text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}

export function PlayerSheet({
  player,
  league,
  open,
  isCurrentUser,
  onOpenChange,
  onChallenge,
}: PlayerSheetProps) {
  if (!player) return null;

  const { stats } = player;
  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.wins / stats.gamesPlayed) * 100)
      : 0;
  const LeagueIcon = league.icon;

  return (
    <AppDrawer open={open} onOpenChange={onOpenChange}>
      <AppDrawerContent closeLabel="Cerrar">
        <AppDrawerBody>
          <div className="flex flex-col items-center gap-3 text-center">
            <UserAvatar
              name={player.name}
              src={player.avatarUrl}
              className={cn(
                "size-20 border-4 bg-background shadow-xl",
                league.border,
                league.shadow,
              )}
            />
            <div className="space-y-1">
              <DrawerTitle className="text-2xl font-black tracking-tight">
                {player.name}
                {isCurrentUser && " (Tú)"}
              </DrawerTitle>
              <DrawerDescription className="flex items-center justify-center gap-1.5">
                <LeagueIcon
                  aria-hidden="true"
                  className={cn("size-4", league.color)}
                />
                <span className={cn("font-bold", league.color)}>
                  {league.label}
                </span>
                <span aria-hidden="true">·</span>
                <span>Nivel {player.level}</span>
              </DrawerDescription>
            </div>
          </div>

          <GlassCard className="grid grid-cols-3 divide-x divide-border/50">
            <SummaryCell label="Puesto" value={`#${player.rank}`} />
            <SummaryCell label="Puntos" value={player.score} />
            <SummaryCell
              label="Semana"
              value={
                <RankTrend
                  change={player.rankChange}
                  className="text-sm font-bold"
                />
              }
            />
          </GlassCard>

          <GlassCard className="divide-y divide-border/50">
            <StatRow
              icon={Gamepad2}
              tone="primary"
              label="Partidas jugadas"
              value={stats.gamesPlayed}
            />
            <StatRow
              icon={Trophy}
              tone="primary"
              label="Victorias"
              value={
                <>
                  {stats.wins}
                  <span className="ml-1.5 font-medium text-muted-foreground">
                    {winRate}%
                  </span>
                </>
              }
            />
            <StatRow
              icon={Flame}
              tone="orange"
              label="Mejor racha"
              value={stats.bestStreak}
            />
            <StatRow
              icon={Star}
              tone="amber"
              label="Estrellas"
              value={stats.stars}
            />
          </GlassCard>
        </AppDrawerBody>

        {!isCurrentUser && (
          <DrawerFooter>
            <AppButton
              size="lg"
              onClick={() => onChallenge(player)}
              className="w-full"
            >
              <Swords aria-hidden="true" />
              <span className="truncate">Retar a {player.name}</span>
            </AppButton>
          </DrawerFooter>
        )}
      </AppDrawerContent>
    </AppDrawer>
  );
}
