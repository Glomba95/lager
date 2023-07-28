import { View, Text } from 'react-native';
import { DataTable } from "react-native-paper";
import { Typography } from "../styles";

function StockList({products}) {
  const tableData = products.map((product, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell numeric style={{flex: 1}}>{product.id}</DataTable.Cell>
        <DataTable.Cell style={{flex: 3, paddingLeft: 38}}>{product.name}</DataTable.Cell>
        <DataTable.Cell style={{flex: 1.5}}>{product.stock > 0 ? product.stock : 0} st</DataTable.Cell>
      </DataTable.Row>
    );
  });
  
  return (
    <DataTable style={{flex:1}}>
      <DataTable.Header>
        <DataTable.Title numeric style={{flex: 1}}>ID</DataTable.Title>
        <DataTable.Title style={{flex: 3, paddingLeft: 38}}>Produkt</DataTable.Title>
        <DataTable.Title style={{flex: 1.5}}>Lagersaldo</DataTable.Title>
      </DataTable.Header>
      {tableData}
    </DataTable>
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
