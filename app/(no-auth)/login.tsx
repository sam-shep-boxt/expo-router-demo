import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link, router, useGlobalSearchParams, useLocalSearchParams, usePathname} from 'expo-router';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch, useAppSelector} from '@/store';
import {setAuth} from '@/api/auth/authSlice';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
export default function Page() {
  const dispatch = useAppDispatch();
  const {redirect} = useAppSelector((state) => state.nav);

  return (
    <ParallaxScrollView headerBackgroundColor={{light: '#FF5733', dark: '#1D3D47'}} headerImage={<></>}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Login
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            dispatch(setAuth(true));

            router.replace('/home');
          }}
          style={styles.button}>
          <Text>Login</Text>
        </TouchableOpacity>

        <ThemedText type="default">
          Below button attempts to navigate you to an authenticated screen (wont work)
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            dispatch(setAuth(true));

            router.navigate('/settings');
          }}
          style={styles.button}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});
