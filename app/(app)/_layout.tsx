import { Text } from "react-native";
import {
  Redirect,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { setRedirect } from "@/api/navigation/navigationSlice";

export default function AppLayout() {
  const { loggedIn } = useAppSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const local = useLocalSearchParams();
  const global = useGlobalSearchParams();
  console.log("(app)", { pathname, local, global });
  //   Only require authentication within the (app) group's layout as users
  //   need to be able to access the (auth) group and sign in again.
  if (!loggedIn) {
    console.log("not authenticated, redirecting...");
    if (local.screen) {
      console.log("Url detected, saving ", {
        pathname: local.screen,
        params: local.params,
      });

      dispatch(setRedirect({ pathname: local.screen, params: local.params }));
    }
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
