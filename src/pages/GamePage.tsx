import { PlayIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export function GamePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Zona de Juego
        </h1>
        <p className="text-sm text-muted-foreground">
          Compite y pon a prueba tus habilidades en tiempo real.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Partida Rápida</CardTitle>
          <CardDescription>
            Inicia una partida competitiva o practica tus reflejos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="w-full sm:w-auto">
            <PlayIcon />
            Comenzar Partida
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
