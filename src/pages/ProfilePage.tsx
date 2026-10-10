import { SettingsIcon, SparklesIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router";

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Perfil de Usuario
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona tu cuenta, preferencias y configuración general.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Mi Cuenta</CardTitle>
          <CardDescription>
            Detalles de tu sesión y accesos directos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            render={
              <Link
                to="/settings"
                viewTransition
                // onClick={() => setTransitionType("forward")}
              />
            }
          >
            <SettingsIcon />
            Ir a Configuración
          </Button>

          <Button
            variant="outline"
            render={
              <Link
                to="/demo"
                viewTransition
                // onClick={() => setTransitionType("forward")}
              />
            }
          >
            <SparklesIcon />
            Ver Catálogo de Componentes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
