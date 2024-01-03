"use client";

import { StyleSheet } from "react-native";

import { useServerInsertedHTML } from "next/navigation";

import {
  createOmniSheet,
  createOmniTheme,
  OmniProvider,
} from "@omnistylejs/core";

interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  const omnisheet = createOmniSheet();

  useServerInsertedHTML(() => {
    // @ts-expect-error - typing error
    const sheet = StyleSheet.getSheet();

    return (
      <>
        <style
          id={sheet.id}
          dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        />
        {omnisheet.getStyleElement()}
      </>
    );
  });

  return (
    <OmniProvider omnisheet={omnisheet} theme={omniTheme}>
      {children}
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
