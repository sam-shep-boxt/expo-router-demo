import {useCallback, useEffect, useMemo, useRef} from 'react';
import {
  useRouter,
  useSegments,
  useRootNavigationState,
  useFocusEffect,
  useLocalSearchParams,
  useGlobalSearchParams,
  usePathname,
  router,
} from 'expo-router';

import {getStore, RootState, useAppDispatch, useAppSelector} from '@/store';
import {setRedirect} from '@/api/navigation/navigationSlice';

const getNavState = (state: RootState) => state.nav;
const getAuth = (state: RootState) => state.auth;

export function useProtectedRoute() {
  // Outside of redux context
  const {dispatch, getState} = getStore();
  const {loggedIn} = getAuth(getState());
  const {redirect} = getNavState(getState());

  // Expo router hooks
  const segments = useSegments();
  const global = useGlobalSearchParams();
  const rootNavigationState = useRootNavigationState();

  // Refs
  const prevAuthRef = useRef<null | boolean>(loggedIn);
  console.log({loggedIn});
  useEffect(() => {
    // Navigation is not ready to accept input
    if (!rootNavigationState?.key) return;
    console.log(prevAuthRef.current, loggedIn);
    if (prevAuthRef.current !== loggedIn) {
      console.log('change in auth?');
      // If user has gone from logged out into logged in, redirect to saved path if applicable
      if (!prevAuthRef.current && loggedIn && redirect) {
        prevAuthRef.current = loggedIn;
        const {params, pathname} = redirect;

        console.log('Saved redirect and user is now logged in, redirect', {params, pathname});

        if (router.canGoBack()) {
          router.dismissAll();
        }

        router.replace({params, pathname});

        // Clear saved
        dispatch(setRedirect(null));

        return;
      }

      // If user has gone from logged in into logged out, redirect to login
      if (prevAuthRef.current && !loggedIn) {
        prevAuthRef.current = loggedIn;
        console.log('logging out');
        if (router.canGoBack()) {
          router.dismissAll();
        }

        router.replace('/login');

        return;
      }

      prevAuthRef.current = loggedIn;
    }

    const inAuthGroup = segments[0] === '(no-auth)';
    let urlParams = {};

    if (Object.keys(global).length > 1) {
      // Initial means its coming from deeplink i think
      const {intial, params, path, screen, ...pathParams} = global;
      urlParams = pathParams;
    }

    // User is logged out and trying to access a non-authenticated screen - continue with desired action
    if (!loggedIn && inAuthGroup) {
      console.log('Not logged in, non-protected route, continue');

      return;
    }

    // User is logged out and trying to access an authenticated screen - prevent action
    if (!loggedIn && !inAuthGroup) {
      // Initial being present indicates its from a deep link, so we want to save the link for when we login
      if (urlParams.initial) {
        console.log('saving route,', {params: urlParams, pathname: segments.join('/')});
        dispatch(setRedirect({params: urlParams, pathname: segments.join('/')}));
      }

      if (router.canGoBack()) {
        router.dismissAll();
      }

      router.replace('/login');
      console.log('Not logged in, protected route, redirecting');
      return;
    }

    // User is logged in and trying to access an non-authenticated screen - prevent action
    if (loggedIn && inAuthGroup) {
      if (router.canGoBack()) {
        router.dismissAll();
      }

      router.replace('/home');
      console.log('Logged in, non-protected route, redirecting');

      return;
    }

    // User is logged in and trying to access authenticated screen - continue with desired action or redirect to saved link
    if (loggedIn && !inAuthGroup) {
      console.log('Logged in, protected route, continue');

      return;
    }
  }, [loggedIn, segments, rootNavigationState, global]);

  return null;
}
