import { Button, Text, TouchableOpacity, View } from "react-native";
import {
  Link,
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { setAuth } from "@/api/auth/authSlice";

export default function Page() {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state: RootState) => state.auth);
  const { redirect } = useAppSelector((state: RootState) => state.nav);
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login</Text>
      <Text>Auth value: {loggedIn.toString()}</Text>
      <Text>global: {`${Boolean(global.screen)}`}</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(setAuth(true));

          if (redirect) {
            router.replace({
              pathname: redirect.pathname,
              params: redirect.params,
            });

            return;
          }

          router.replace("/home");
        }}
        style={{ borderWidth: 1, padding: 10, marginTop: 70 }}
      >
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.replace("/logout");
        }}
        style={{ borderWidth: 1, padding: 10, marginTop: 20 }}
      >
        <Text>Authed route</Text>
      </TouchableOpacity>
    </View>
  );
}
