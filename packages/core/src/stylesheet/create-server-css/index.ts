import { OmniContextType } from "../../provider/context";
import { Breakpoint } from "../../theme/tokens/breakpoints";
import { ExtractType, ParsedStyleValues, StyleValues } from "../../types";
import { camelToKebab } from "../../utils/string";

function convertValue(value: unknown) {
  return isNaN(value as number) ? value : `${value}px`;
}

export function createServerCss(
  cssClass: string,
  parsed: ParsedStyleValues<ExtractType<Partial<StyleValues>>>,
  breakpoints: Breakpoint,
  omnisheet: OmniContextType["omnisheet"],
) {
  const classSelector = `.${cssClass}`;

  if (parsed.initial) {
    const cssString = Object.entries(parsed.initial ?? {})
      .map(
        ([subKey, subValue]) =>
          `${camelToKebab(subKey)}: ${convertValue(subValue)} !important;`,
      )
      .join("\n");

    const rule = `${classSelector}{${cssString}}`;

    if (rule) {
      omnisheet.addCSS(
        cssClass,
        rule.replace(/calc\(([^)]+)\)/g, (_, expression) => {
          const modifiedExpression = expression.replace(
            /([\+\-\*\/])/g,
            " $1 ",
          );

          return `calc(${modifiedExpression})`;
        }),
      );
    }
  }

  for (const query of Object.keys(parsed.queries)) {
    const queryValue = parsed.queries[query as keyof Breakpoint];

    const cssString = Object.entries(queryValue ?? {})
      .map(
        ([subKey, subValue]) =>
          `${camelToKebab(subKey)}: ${convertValue(subValue)} !important;`,
      )
      .join("\n");

    const rule = `${classSelector}{${cssString}}`;

    const cssRuleWithMediaQuery = breakpoints[query as keyof Breakpoint]
      ? `@media only screen and (min-width: ${
          breakpoints[query as keyof Breakpoint]
        }px) { ${rule} }`
      : undefined;

    if (cssRuleWithMediaQuery) {
      omnisheet.addCSS(
        `mq_${cssClass}`,
        cssRuleWithMediaQuery.replace(/calc\(([^)]+)\)/g, (_, expression) => {
          const modifiedExpression = expression.replace(
            /([\+\-\*\/])/g,
            " $1 ",
          );

          return `calc(${modifiedExpression})`;
        }),
      );
    }
  }

  return [{ $$css: true, [cssClass as string]: cssClass }];
}
