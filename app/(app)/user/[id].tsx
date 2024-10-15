import { Text, View } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";

const friends = ["charlie", "james"];

export default function Route() {
  const { id, other } = useLocalSearchParams<{ id: string; other?: string }>();

  return (
    <View>
      <Text>User id: {id}</Text>
      <Text>Query: {other}</Text>
    </View>
  );
}
