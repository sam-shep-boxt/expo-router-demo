# Expo router demo 🤠

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Screen not found
If there is a deeplink pressed to a screen that doesnt exist, it will automatically show the screen in `app/+not-found.tsx`

Further work and thought needs to go into when the user is linked to a valid screen but with invalid data

## Authentication + deep links

I have created a protected route hook `hooks/useProtectedRoute.ts` that monitors the change in navigation and deeplinks etc to ensure that we have the concept of authenticated and non-authenticated screens.

If the user is logged out but presses a deeplink to an authenticated page, it will save the link and re-direct you to that screen when you log in. This works for the deeplink opening the app and also when used while the app is already running

Further work is required to check the routes against a blacklist to stop people skipping into unwanted flows

|Description|Cmd|
|-|-|
|Sign up screen (non-auth)|`npx uri-scheme open "exp://127.0.0.1:8081/--/sign-up" --ios`|
|Settings screen (auth)|`npx uri-scheme open "exp://127.0.0.1:8081/--/settings" --ios`|
|Specific fish screen (auth with params)|`npx uri-scheme open "exp://127.0.0.1:8081/--/fish/1?name=Flounder" --ios`|

## Tabs

In this project you can see an example of tabs being used. When you log in, it will put you at the "Home page" where the tabs are visible. On the fish list screen, there is an example of navigating away from the tabs.

Questions:
1. How do we navigate back to the tabs easily if we used a deeplink to get to that screen

## Url generation
There is a rough script in `scripts/generate-urls.js` (needs adjusting of directory, works fine in root but not adjusted to work in script folder) which will spit out a list of all the routes you can deep link to -> which will be useful for non-technical people to use





