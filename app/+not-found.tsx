import {Text, TouchableOpacity, View} from 'react-native';
import {router} from 'expo-router';
import {useAppSelector} from '@/store';

export default function NotFoundScreen() {
  const {loggedIn} = useAppSelector((state) => state.auth);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>SCREEN NOT FOUND</Text>

      <TouchableOpacity
        onPress={() => {
          router.replace(loggedIn ? '/home' : '/login');
        }}
        style={{borderWidth: 1, padding: 10, marginTop: 70}}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
