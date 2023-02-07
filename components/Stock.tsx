import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import productModel from "../models/products";

import { Typography } from "../styles";

// FIXME Varför uppdateras inte saldot efter inlev?
// Skulle det fungera att ersätta [] med {products}?
function StockList({products, setProducts}) {
  useEffect(() => {
    async function setProductsAsync() {
      setProducts(await productModel.getProducts());
    };
    
    setProductsAsync();
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
      <Text style={{...Typography.header2}}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
}
