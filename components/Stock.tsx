import { View, Text } from 'react-native';
import { Typography } from "../styles";

function StockList({products}) {
  const list = products.map((product, index) => {
    return (
      <Text
        key={index}
        style={{ ...Typography.normal }}
      >
        { product.name } - { product.stock } st
      </Text>
    );
  });
  
  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock({products}) {
  return (
    <View>
      <Text style={{...Typography.header2}}>Lagerförteckning</Text>
      <StockList products={products} />
    </View>
  );
}
