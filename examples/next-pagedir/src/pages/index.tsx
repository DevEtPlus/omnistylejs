"use client";

import { View } from "react-native";

export default function Home() {
  return (
    <main>
      <View>
        <h3>{JSON.stringify({}, null, 2)}</h3>
      </View>
    </main>
  );
}
