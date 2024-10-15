import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useAppDispatch, useAppSelector} from '@/store';
import {setAuth} from '@/api/auth/authSlice';
import {router} from 'expo-router';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();

  return (
    <ParallaxScrollView headerBackgroundColor={{light: 'pink', dark: '#1D3D47'}} headerImage={<></>}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
        <TouchableOpacity
          onPress={() => {
            // Logout
            dispatch(setAuth(false));

            // re-route
            router.replace('/login');
          }}
          style={styles.button}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    marginTop: 70,
  },
});
