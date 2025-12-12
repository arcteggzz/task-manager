export function slugify(input: string) {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  const rnd = Math.random().toString(36).slice(2, 8)
  return `${base}${rnd}`
}
