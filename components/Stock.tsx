import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import productModel from "../models/products";

import { Typography } from "../styles";


function StockList({products, setProducts}) {
  useEffect(async () => {
    setProducts(await productModel.getProducts());
  }, [])

  const list = products.map((product, index) => {
    return <Text
            key={index}
            style={{ ...Typography.normal }}
            >
              { product.name } - { product.stock } st
            </Text>
  });
  
  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock({products, setProducts}) {
  return (
    <View>
<<<<<<< HEAD
      <Text style={{color: '#333', fontSize: 24}}>Lagerförteckning</Text>
      <StockList />
=======
      <Text style={{...Typography.header2}}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
>>>>>>> ff5c9e2 (kmom02 done)
    </View>
  );
}
