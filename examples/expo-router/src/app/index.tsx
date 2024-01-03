import { ScrollView, Text, View } from "react-native";

import { createOmniStyleSheet } from "@omnistylejs/core";

export default function Home() {
  const styles = useStyles();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>{JSON.stringify({}, null, 2)}</Text>
      </View>
    </ScrollView>
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
