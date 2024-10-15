import {router, useLocalSearchParams} from 'expo-router';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

const FISH_SIZE = 100;

export default function FishScreen() {
  const {id, name} = useLocalSearchParams<{id: string; name: string}>();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{light: '#7DF9FF', dark: '#1D3D47'}}
      headerImage={
        <View style={styles.fish}>
          <TabBarIcon name={'fish'} color={'black'} size={FISH_SIZE} />
          <TabBarIcon name={'fish'} color={'black'} size={FISH_SIZE} />
          <TabBarIcon name={'fish'} color={'black'} size={FISH_SIZE} />
        </View>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fish id:{id}</ThemedText>

        <ThemedText type="title">{name}</ThemedText>

        <TouchableOpacity
          onPress={() => {
            router.navigate('/home');
          }}
          style={styles.button}>
          <Text>Home</Text>
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
  fish: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
  },
});
