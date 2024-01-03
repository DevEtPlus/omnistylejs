import { createElement, useMemo } from "react";

import { useDeviceColorSchemeWithEnabled } from "../hooks/use-device-color-scheme-with-enabled";
import { useMounted } from "../hooks/use-mounted";
import { DEFAULT_THEME } from "../theme";
import { OmniContext, OmniContextType } from "./context";
import { createOmniSheet } from "./create-omnisheet";

export { createOmniSheet } from "./create-omnisheet";
export { useOmniTheme } from "./context";

interface OmniProviderProps {
  children?: React.ReactNode;

  omnisheet?: OmniContextType["omnisheet"];
  colorMode?: OmniContextType["colorMode"];
  theme?: OmniContextType["theme"];
}

export function OmniProvider({
  children,
  theme,
  colorMode,
  omnisheet,
}: OmniProviderProps) {
  omnisheet?.addColorVars(theme?.colorVars, !!colorMode);

  const mounted = useMounted();

  const deviceColorScheme = useDeviceColorSchemeWithEnabled(!mounted);

  const context: OmniContextType = useMemo(() => {
    return {
      omnisheet: omnisheet ?? createOmniSheet(),
      colorMode:
        colorMode ?? (deviceColorScheme as OmniContextType["colorMode"]),
      theme: theme ?? {
        colorVars: {},
        theme: DEFAULT_THEME,
      },
    };
  }, [colorMode, deviceColorScheme, omnisheet, theme]);

  return createElement(
    OmniContext.Provider,
    {
      key: "omni-provider",
      value: context,
    },
    children,
  );
}
