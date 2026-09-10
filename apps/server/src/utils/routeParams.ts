export function getRouteParam(value: unknown) {
  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }

  return String(value ?? "");
}
