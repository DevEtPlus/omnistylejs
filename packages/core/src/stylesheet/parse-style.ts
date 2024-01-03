import type {
  ExtractType,
  OmniTheme,
  ParsedStyleValues,
  StyleValues,
} from '../types'

export function parseStyle<S extends Partial<StyleValues>>(
  style: S,
  breakpoints: OmniTheme['theme']['breakpoints']
): ParsedStyleValues<ExtractType<S>> {
  return Object.entries(style).reduce(
    (acc, cur) => {
      const [styleKey, styleValue] = cur as [
        keyof StyleValues,
        StyleValues[keyof StyleValues],
      ]

      if (
        typeof styleValue === 'object' &&
        styleValue !== null &&
        Object.keys(styleValue).some(k => Object.keys(breakpoints).includes(k))
      ) {
        for (const bp of Object.keys(styleValue)) {
          if (breakpoints[bp as keyof typeof breakpoints] === '0px') {
            acc.initial = {
              ...acc.initial,
              [styleKey]: styleValue[bp as keyof typeof styleValue],
            }

            continue
          }

          acc.queries = {
            ...acc.queries,
            [bp]: {
              ...acc.queries[bp],
              [styleKey]: styleValue[bp as keyof typeof styleValue],
            },
          }
        }

        return acc
      }

      acc.initial = {
        ...acc.initial,
        [styleKey]: styleValue,
      }

      return acc
    },
    { initial: {}, queries: {} } as ParsedStyleValues<ExtractType<any>>
  )
}
