import { ScrollView, Text, Image } from 'react-native';
import { Base, Typography } from '../styles';
// @ts-ignore
import warehouse from '../assets/warehouse.jpg';

import Stock from './Stock';

export default function Home({products}) {
  return (
      <ScrollView style={Base.base}>
          <Text style={Typography.header1}>Lagr1</Text>
          <Image 
            source={warehouse} 
            style={{ 
              width: 320, 
              height: 240, 
              alignSelf: "center", 
              marginBottom: 42, 
            }} />
          <Stock products={products} />
      </ScrollView>
  );
}
