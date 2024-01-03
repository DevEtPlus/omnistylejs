import { createContext, useContext, useMemo } from "react";

import { useMounted } from "../hooks/use-mounted";
import { OmniThemeType } from "../theme";
import { OmniTheme, Theme, Variables } from "../types";
import { createOmniSheet } from "./create-omnisheet";

export interface OmniContextType {
  omnisheet: ReturnType<typeof createOmniSheet>;
  colorMode: "light" | "dark";
  theme: {
    colorVars: Variables;
    theme: Theme<OmniThemeType>;
  };
}

export const OmniContext = createContext<OmniContextType>(
  null as unknown as OmniContextType,
);

export function useOmniContext(isClient?: boolean) {
  const mounted = useMounted();

  const context = useContext(OmniContext);

  if (!context) {
    console.error(
      "Please wrap your app with <OmniProvider> from @omnistylejs/core",
    );
  }

  return useMemo(() => {
    if (!isClient && !mounted) {
      return context;
    }

    const colors = Object.entries(context.theme.theme.colors ?? {})
      .filter(
        (color) =>
          typeof color[1] === "string" && color[1].startsWith("var(--"),
      )
      .reduce((acc, [key, value]) => {
        const match =
          typeof value === "string" && value.match(/^var\(--(.+)\)$/);

        if (match) {
          return {
            ...acc,
            [key]: context.theme.colorVars[match[1]][context.colorMode],
          };
        }

        return {
          ...acc,
          [key]: value,
        };
      }, {});

    return {
      ...context,
      theme: {
        ...context.theme,
        theme: {
          ...context.theme.theme,
          colors: {
            ...context.theme.theme.colors,
            ...colors,
          },
        },
      },
    } as OmniContextType;
  }, [context, isClient, mounted]);
}

export function useOmniTheme(): Required<OmniTheme["theme"]> {
  const context = useOmniContext(true);

  return context.theme.theme as unknown as OmniTheme["theme"];
}
