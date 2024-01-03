"use client";

import { Text, View } from "react-native";

import { createOmniStyleSheet } from "@omnistylejs/core";

export default function Home() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify({}, null, 2)}</Text>
    </View>
  );
}

const useStyles = createOmniStyleSheet((theme) => ({
  container: [
    {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
    },
  ],
}));
