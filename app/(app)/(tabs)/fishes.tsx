import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {router} from 'expo-router';

const FISHES = [
  {id: 1, name: 'Flounder'},
  {id: 2, name: 'Salmon'},
  {id: 3, name: 'Tuna'},
  {id: 4, name: 'Halibut'},
  {id: 5, name: 'Cod'},
];

export default function FishListScreen() {
  return (
    <ParallaxScrollView headerBackgroundColor={{light: '#088F8F', dark: '#1D3D47'}} headerImage={<></>}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fish list</ThemedText>
      </ThemedView>

      {FISHES.map(({id, name}) => (
        <TouchableOpacity
          onPress={() => {
            router.navigate({
              pathname: '/fish/[id]',
              params: {id, name},
            });
          }}
          key={id}
          style={styles.button}>
          <Text>{name}</Text>
        </TouchableOpacity>
      ))}
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
    marginTop: 5,
  },
});
