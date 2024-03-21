export function buildPath(parts: string[]) {
  const validParts = parts.filter((p) => p && p !== '').map((p) => p.replace(/^\/|\/$/g, ''));
  return validParts.join('/');
}
