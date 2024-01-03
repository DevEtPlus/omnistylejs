import { Text, View } from "react-native";

import { Platform } from "@omnistylejs/core";

export default function Home() {
  return (
    <View>
      <Text>{JSON.stringify({ Platform }, null, 2)}</Text>
    </View>
  );
}
