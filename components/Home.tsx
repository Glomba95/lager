import { ScrollView, Text, Image } from 'react-native';
import { Base, Typography } from '../styles';
// @ts-ignore
import warehouse from '../assets/warehouse.jpg';

import Stock from './Stock';

export default function Home({products}) {
  return (
      <ScrollView style={Base.base}>
          <Text style={Typography.header1}>Lager-Appen</Text>
          <Image 
            source={warehouse} 
            style={{ 
              width: 320, 
              height: 240, 
              marginBottom: 28 
            }} />
          <Stock products={products} />
      </ScrollView>
  );
}
