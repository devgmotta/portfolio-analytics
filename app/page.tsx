import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NoiseOverlay } from "@/components/noise-overlay";

export default function Home() {
  return (
    <div className="relative">
      <NoiseOverlay />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <Card className="glass-card w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-mono text-sm tracking-widest text-primary uppercase">
              Terminal Elegance
            </CardTitle>
            <CardDescription>
              Fase 0 concluída: tokens, glassmorphism e fontes no lugar.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-secondary/30 bg-secondary/10 text-secondary">
                dbt
              </Badge>
              <Badge className="border-secondary/30 bg-secondary/10 text-secondary">
                BigQuery
              </Badge>
              <Badge className="border-secondary/30 bg-secondary/10 text-secondary">
                Docker
              </Badge>
            </div>
            <Button>CTA de teste</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
