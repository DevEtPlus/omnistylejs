import { CompleteStyle, Theme, Variables } from "../types";
import { mergeShallow } from "../utils/object";
import { BorderRadii, borderRadii } from "./tokens/border-radii";
import { BorderWidth, borderWidth } from "./tokens/border-width";
import { Breakpoint, breakpoints } from "./tokens/breakpoints";
import { Color, colors } from "./tokens/colors";
import { FontSize, fontSize } from "./tokens/font-size";
import { FontWeight, fontWeight } from "./tokens/font-weight";
import { Font, fonts } from "./tokens/fonts";
import { LetterSpacing, letterSpacing } from "./tokens/letter-spacing";
import { lineHeight, LineHeight } from "./tokens/line-height";
import { Opacity, opacity } from "./tokens/opacity";
import { Shadow, shadow } from "./tokens/shadow";
import { Size, size } from "./tokens/size";
import { Space, space } from "./tokens/space";

export type OmniThemeType = {
  colors?: Color;
  opacity?: Opacity;
  space?: Space;
  size?: Size;
  breakpoints?: Breakpoint;
  borderWidth?: BorderWidth;
  borderRadii?: BorderRadii;
  fonts?: Font;
  fontWeight?: FontWeight;
  fontSize?: FontSize;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  shadow?: Shadow;

  templates?: { [key: string | number]: CompleteStyle };
};

export const DEFAULT_THEME = {
  colors,
  opacity,
  space,
  size,
  breakpoints,
  borderWidth,
  borderRadii,
  fonts,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  shadow,

  templates: {},
} as const satisfies OmniThemeType;

export function createOmniTheme<T extends OmniThemeType>(theme?: T) {
  if (!theme) {
    theme = {} as T;
  }

  const colorVars: Variables = {};

  const omniTheme = Object.entries(DEFAULT_THEME).reduce((acc, cur) => {
    const [key, value] = cur as [
      keyof OmniThemeType,
      OmniThemeType[keyof OmniThemeType],
    ];

    if (key === "colors") {
      if (theme?.colors) {
        const newColors = Object.entries(theme.colors).reduce((acc, cur) => {
          const [subKey, subValue] = cur as [keyof Color, Color[keyof Color]];

          if (subValue && typeof subValue === "object") {
            colorVars[subKey] = subValue;

            return {
              ...acc,
              [subKey]: `var(--${subKey})`,
            };
          }

          return {
            ...acc,
            [subKey]: subValue,
          };
        }, {});

        return { ...acc, colors: mergeShallow(value, newColors) };
      }

      return { ...acc, [key]: mergeShallow(value, theme![key]) };
    }

    return { ...acc, [key]: mergeShallow(value, theme![key]) };
  }, {}) as unknown as Theme<T>;

  return {
    colorVars,
    theme: omniTheme,
  };
}
