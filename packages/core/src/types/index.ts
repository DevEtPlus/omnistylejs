import {
  ImageStyle as RNImageStyle,
  TextStyle as RNTextStyle,
  ViewStyle as RNViewStyle,
} from "react-native";

import { DEFAULT_THEME } from "../theme";
import { DeepMergeTwoTypes } from "./deep-merge-two-types";
import { ImageStyle, TextStyle, ViewStyle } from "./rn-style";

export {
  ImageStyle,
  TextStyle,
  ViewStyle,
  WebDimensionValue,
} from "./rn-style";

export type AnyStyle = ViewStyle | TextStyle | ImageStyle;
export type AnyBaseStyle = RNViewStyle | RNTextStyle | RNImageStyle;

export type CompleteStyle = ViewStyle & TextStyle & ImageStyle;

export interface OmniTheme {
  [key: string]: Record<string, any>;
}

export type ColorValue = `#${string}` | "transparent";

export interface Variables {
  [key: string]: {
    light: ColorValue;
    dark: ColorValue;
  };
}

type ReplaceColorType<T> = {
  [K in keyof T]: T[K] extends { light: string; dark: string }
    ? `var(--${string & K})`
    : T[K];
};

export type Theme<T extends Record<string, any>> = Required<
  Omit<
    T extends never
      ? typeof DEFAULT_THEME
      : DeepMergeTwoTypes<typeof DEFAULT_THEME, T>,
    "colors"
  >
> & {
  colors: Required<
    T extends never
      ? ReplaceColorType<typeof DEFAULT_THEME.colors>
      : DeepMergeTwoTypes<
          ReplaceColorType<typeof DEFAULT_THEME.colors>,
          ReplaceColorType<T["colors"]>
        >
  >;
};

export type ToResponsive<T> =
  | T
  | {
      [key in keyof OmniTheme["theme"]["breakpoints"]]?: T;
    };

export type StyleValues = {
  [NKey in keyof CompleteStyle]?: ToResponsive<CompleteStyle[NKey]>;
};

export type StyleValuesWithQuery = {
  initial: CompleteStyle;
  query: {
    minWidth: number;
    style: CompleteStyle;
  }[];
};

export type StyleList<T> =
  | T
  | undefined
  | null
  | false
  | ReadonlyArray<StyleList<T>>;

export type StyleSheet = {
  [styleName: string]:
    | StyleList<StyleValues>
    | ((...args: any) => StyleList<StyleValues>);
};

export type ExtendedStyleSheet =
  | ((theme: OmniTheme["theme"]) => StyleSheet)
  | StyleSheet;

type ParseNestedObject<T> = T extends (...args: infer A) => any
  ? (...args: A) => AnyBaseStyle
  : AnyBaseStyle;

type ParseStyleKeys<T> = T extends object
  ? { [K in keyof T]: ParseNestedObject<T[K]> }
  : never;

export type ReactNativeStyleSheet<T> = T extends (
  theme: OmniTheme["theme"],
) => infer R
  ? ParseStyleKeys<R>
  : ParseStyleKeys<T>;

export type ParsedStyleValues<T> = {
  initial: T;
} & {
  queries: {
    [Breakpoint in keyof OmniTheme["theme"]["breakpoints"]]?: T;
  };
};

export type ExtractType<T> = T extends StyleList<infer A>
  ? A extends false | infer C | null | undefined
    ? C
    : A
  : T extends false | infer C | null | undefined
    ? C
    : T;
