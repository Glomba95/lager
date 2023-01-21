import { Text, Image, ScrollView } from 'react-native';
import { Base, Typography } from '../styles';
import warehouse from '../assets/warehouse.jpg';

import Stock from './Stock';

export default function Home({route, products, setProducts}) {
  return (
      <ScrollView style={Base.base}>
          <Text style={Typography.header1}>Lager-Appen</Text>
          <Image source={warehouse} style={{ width: 320, height: 240, marginBottom: 28 }} />
          <Stock products={products} setProducts={setProducts} />
      </ScrollView>
  );
}