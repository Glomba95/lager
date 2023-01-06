import { StatusBar } from 'expo-status-bar';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import Stock from './Stock';
import warehouse from './../assets/warehouse.jpg';

export default function Home() {
  return (
      <ScrollView style={styles.base}>
        <Text style={{color: '#33c', fontSize: 42}}>Lager-Appen</Text>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
        <Stock />
        <StatusBar style="auto" />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 12,
  },
});