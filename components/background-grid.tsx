/**
 * Malha de pontos fixa, com máscara radial de opacidade — soma profundidade
 * ao fundo sem competir com o conteúdo. Convive com `.bg-noise` (textura),
 * não a substitui: são duas camadas de sutileza diferentes.
 */
export function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)] dark:opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--border) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}
