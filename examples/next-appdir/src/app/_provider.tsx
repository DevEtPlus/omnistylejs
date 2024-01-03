"use client";

import { StyleSheet } from "react-native";

import { useServerInsertedHTML } from "next/navigation";

interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  useServerInsertedHTML(() => {
    // @ts-expect-error - typing error
    const sheet = StyleSheet.getSheet();

    return (
      <>
        <style
          id={sheet.id}
          dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        />
      </>
    );
  });

  return <>{children}</>;
}
