// LEGACY: simple prototype token factory kept for future isolated tests.
// Production token creation now flows through tokenStore/socket/map services.
export function createToken(x: number, y: number) {
  return {
    id: crypto.randomUUID(),
    x,
    y
  };
}
