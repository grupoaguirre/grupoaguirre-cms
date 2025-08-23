import originalSlugify from 'slugify'

export const slugify = (text: string): string => {
  return originalSlugify(text, {
    lower: true,
    strict: true,
    locale: 'es',
  })
}
