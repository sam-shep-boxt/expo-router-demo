import {
  Image,
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router } from "expo-router";
import { useAppDispatch } from "@/store";
import { setAuth } from "@/api/auth/authSlice";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>

        <TouchableOpacity
          onPress={() => {
            dispatch(setAuth(true));
            router.navigate({
              pathname: "/user/[id]",
              params: { id: "bacon", other: "anything you want here" },
            });
          }}
          style={{ borderWidth: 1, padding: 10, marginTop: 70 }}
        >
          <Text>View user</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
