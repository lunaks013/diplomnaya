/** Путь к файлу из public/ с учётом base Vite (./ при открытии из dist). */
export function publicAsset(path: string): string {
  const [file, query = ""] = path.split("?");
  const clean = file.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  const joined = base.endsWith("/") ? `${base}${clean}` : `${base}/${clean}`;
  return query ? `${joined}?${query}` : joined;
}
