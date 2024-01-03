import { useEffect, useState } from "react";
import { Appearance } from "react-native";

export function useDeviceColorSchemeWithEnabled(enable?: boolean) {
  const [colorScheme, setColorScheme] = useState(() =>
    Appearance.getColorScheme(),
  );

  useEffect(() => {
    if (enable) {
      function handleChange(preferences: Appearance.AppearancePreferences) {
        if (colorScheme !== preferences.colorScheme) {
          setColorScheme(preferences.colorScheme);
        }
      }

      const listener = Appearance.addChangeListener(handleChange);

      handleChange({ colorScheme: Appearance.getColorScheme() });

      return () => {
        listener.remove();
      };
    }

    return () => {};
  }, [colorScheme, enable]);

  return colorScheme;
}
