import { useMemo } from "react";

import { useDimensionsWithEnable } from "../hooks/use-dimensions-with-enabled";
import { useMounted } from "../hooks/use-mounted";
import { useOmniContext } from "../provider/context";
import {
  ExtendedStyleSheet,
  ReactNativeStyleSheet,
  StyleList,
  StyleValues,
} from "../types";
import { isFunction, isReadonlyArray } from "../utils/assertion";
import { generateHash } from "../utils/hash";
import { mergeDeep } from "../utils/object";
import { createServerCss } from "./create-server-css";
import { parseStyle } from "./parse-style";
import { useUnits } from "./use-units";

const processStyleList = <Style>(
  styleList: StyleList<Style>,
): Partial<Style> => {
  if (isReadonlyArray(styleList)) {
    return styleList.reduce(
      (acc, curr) => ({ ...acc, ...processStyleList(curr) }),
      {},
    );
  }

  return styleList ? styleList : {};
};

export function createOmniStyleSheet<S extends ExtendedStyleSheet>(
  stylesheet: S,
): () => ReactNativeStyleSheet<S> {
  return () => {
    const mounted = useMounted();

    const context = useOmniContext();

    const { width } = useDimensionsWithEnable(mounted);

    const convertUnit = useUnits(mounted);

    const parsedStyles = useMemo(
      () =>
        typeof stylesheet === "function"
          ? stylesheet(context.theme.theme)
          : stylesheet,
      [context.theme.theme],
    );

    return useMemo(() => {
      return Object.entries(parsedStyles).reduce<ReactNativeStyleSheet<S>>(
        (acc, cur) => {
          const [key, value] = cur as [keyof StyleSheet, StyleValues];

          if (isFunction(value)) {
            const styleFn = new Proxy(value, {
              apply: (target, thisArg, argArray) => {
                const styleObj = processStyleList(
                  target.apply(thisArg, argArray),
                );

                const parsed = parseStyle(
                  styleObj,
                  context.theme.theme.breakpoints,
                );

                const cssClass = `responsive-${generateHash(
                  JSON.stringify({
                    parsed,
                    value,
                    key,
                  }),
                )}`;

                if (!mounted) {
                  return createServerCss(
                    cssClass,
                    parsed,
                    context.theme.theme.breakpoints,
                    context.omnisheet,
                  );
                }

                return Object.keys(parsed.queries)
                  .sort((a, b) => {
                    return (
                      convertUnit(
                        context.theme.theme.breakpoints[
                          a as keyof typeof context.theme.theme.breakpoints
                        ],
                      ) -
                      convertUnit(
                        context.theme.theme.breakpoints[
                          b as keyof typeof context.theme.theme.breakpoints
                        ],
                      )
                    );
                  })
                  .reduce(
                    (subAcc, subCur) => {
                      const subValue =
                        parsed.queries[
                          subCur as keyof typeof context.theme.theme.breakpoints
                        ];

                      if (
                        convertUnit(
                          context.theme.theme.breakpoints[
                            subCur as keyof typeof context.theme.theme.breakpoints
                          ],
                        ) <= width
                      ) {
                        return mergeDeep(
                          subAcc,
                          Object.entries(subValue ?? {}).reduce((acc, cur) => {
                            return {
                              ...acc,
                              [cur[0]]: convertUnit(cur[1]),
                            };
                          }, {}),
                        );
                      }

                      return subAcc;
                    },
                    {
                      ...Object.entries(parsed.initial).reduce((acc, cur) => {
                        return {
                          ...acc,
                          [cur[0]]: convertUnit(cur[1]),
                        };
                      }, {}),
                    },
                  );
              },
            });

            return {
              ...acc,
              [key]: styleFn,
            };
          }

          const styleObj = processStyleList(value);

          const parsed = parseStyle(styleObj, context.theme.theme.breakpoints);

          const cssClass = `responsive-${generateHash(
            JSON.stringify({
              parsed,
              value,
              key,
            }),
          )}`;

          if (!mounted) {
            return {
              ...acc,
              [key]: createServerCss(
                cssClass,
                parsed,
                context.theme.theme.breakpoints,
                context.omnisheet,
              ),
            };
          }

          return {
            ...acc,
            [key]: Object.keys(parsed.queries)
              .sort((a, b) => {
                return (
                  convertUnit(
                    context.theme.theme.breakpoints[
                      a as keyof typeof context.theme.theme.breakpoints
                    ],
                  ) -
                  convertUnit(
                    context.theme.theme.breakpoints[
                      b as keyof typeof context.theme.theme.breakpoints
                    ],
                  )
                );
              })
              .reduce(
                (subAcc, subCur) => {
                  const subValue =
                    parsed.queries[
                      subCur as keyof typeof context.theme.theme.breakpoints
                    ];

                  if (
                    convertUnit(
                      context.theme.theme.breakpoints[
                        subCur as keyof typeof context.theme.theme.breakpoints
                      ],
                    ) <= width
                  ) {
                    return mergeDeep(
                      subAcc,
                      Object.entries(subValue ?? {}).reduce((acc, cur) => {
                        return {
                          ...acc,
                          [cur[0]]: convertUnit(cur[1]),
                        };
                      }, {}),
                    );
                  }

                  return subAcc;
                },
                {
                  ...Object.entries(parsed.initial).reduce((acc, cur) => {
                    return {
                      ...acc,
                      [cur[0]]: convertUnit(cur[1]),
                    };
                  }, {}),
                },
              ),
          };
        },
        {} as ReactNativeStyleSheet<S>,
      );
    }, [context, convertUnit, mounted, parsedStyles, width]);
  };
}
