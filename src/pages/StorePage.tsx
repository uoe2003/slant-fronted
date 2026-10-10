import { SparklesIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export function StorePage() {
  const items = [
    {
      title: "Pack Neón",
      price: "500 Monedas",
      desc: "Aspecto futurista para tu avatar",
    },
    {
      title: "Pase Élite",
      price: "1200 Monedas",
      desc: "Desbloquea recompensas exclusivas",
    },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Tienda de Objetos
        </h1>
        <p className="text-sm text-muted-foreground">
          Personaliza tu perfil y obtén potenciadores especiales.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SparklesIcon className="size-4 text-primary" />
                {item.title}
              </CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between pt-2">
              <span className="text-sm font-semibold text-primary">
                {item.price}
              </span>
              <Button size="sm">Comprar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
