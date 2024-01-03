import React, { useEffect } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createOmniTheme, OmniProvider } from "@omnistylejs/core";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <OmniProvider theme={omniTheme}>
      <SafeAreaProvider>
        <Stack />
      </SafeAreaProvider>
    </OmniProvider>
  );
}

const omniTheme = createOmniTheme({
  colors: {
    primary: {
      light: "#000",
      dark: "#FFF",
    },
  },
});

type OmniThemeType = typeof omniTheme;

declare module "@omnistylejs/core" {
  export interface OmniTheme extends OmniThemeType {}
}
