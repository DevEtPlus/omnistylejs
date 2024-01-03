import { Breakpoint } from "../../theme/tokens/breakpoints";
import { ExtractType, ParsedStyleValues, StyleValues } from "../../types";

export function createServerCss(
  _cssClass: string,
  _parsed: ParsedStyleValues<ExtractType<Partial<StyleValues>>>,
  _breakpoints: Breakpoint,
) {
  return [];
}
