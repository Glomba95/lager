import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

import orderModel from "../models/orders";
import productModel from "../models/products";

import Product from "../interfaces/product";

import { Base, Typography } from "../styles";

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);

    useEffect(async () => {
        setOrderedProducts(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }
    
    let missingStock: boolean = false;

    const orderItemsList = order.order_items.map((item, index) => {
        let product = orderedProducts.find(product => product.id === item.product_id);
        let txtColor;
        
        
        if (!!product && product.stock < item.amount) {
            missingStock = true;
            txtColor = Typography.red;
        }
        
        return <Text   
                key={index}
                style={[Typography.normal, txtColor]}
                >
                    <Text style={[Typography.tag]}>  {item.location}  </Text>
                    <Text>  {item.name} - {item.amount} st </Text>
                
            </Text>;
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{order.name}</Text>
            <Text style={Typography.normalInline}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Typography.header3}>Produkter:</Text>

            {orderItemsList}

            <Button title="Plocka order" disabled={missingStock} onPress={pick} />
        </View>
    )
};