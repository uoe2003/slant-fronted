import { TrophyIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function RankingPage() {
  const leaderboards = [
    { rank: 1, name: "Alex Rover", score: 9850 },
    { rank: 2, name: "Elena Ramos", score: 9240 },
    { rank: 3, name: "Lucas Vance", score: 8910 },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Clasificación Global
        </h1>
        <p className="text-sm text-muted-foreground">
          Los mejores jugadores de la temporada actual.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrophyIcon className="size-5 text-amber-500" />
            Top Jugadores
          </CardTitle>
          <CardDescription>
            Puntuaciones actualizadas cada hora.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border/60">
            {leaderboards.map((player) => (
              <div
                key={player.rank}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    #{player.rank}
                  </span>
                  <span className="font-medium text-foreground">
                    {player.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  {player.score.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
