export const slugify = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const unslugify = (val: string): string =>
  val
    .replace(/-/g, ' ')
    .replace(/[^\w\s]+/g, '')
    .replace(/\b\w/g, (char) => char.toUpperCase())
