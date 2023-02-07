import { useState } from 'react';
import { ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../styles';

import productModel from '../models/products';
import deliveryModel from '../models/deliveries';

import ProductDropDown from './ProductDropDown';
import DateDropDown from './DateDropDown';

import Delivery from '../interfaces/delivery';
import Product from '../interfaces/product';



export default function DeliveryForm({ navigation, products, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    
    async function addDelivery() {
        console.log("addDelivery", delivery);
    
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };
        
        console.log("cProd", currentProduct);
        console.log("uProd", updatedProduct);

        await productModel.updateProduct(updatedProduct);
        // Testar om update fungerar
        setProducts(await productModel.getProducts());

        navigation.navigate("List", { reload: true });
    };

    return (
        <ScrollView style={ Base.base }>
            <Text style={ Typography.header2 }>Ny inleverans</Text>
            
            <Text style={ Typography.label }>Produkt</Text>
            <ProductDropDown
                products={products}
                setProducts={setProducts}
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
            
            <Text style={ Typography.label }>Antal</Text>
            <TextInput
                style={ Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            
            <Text style={ Typography.label }>Datum</Text>
            <DateDropDown 
                delivery={delivery}
                setDelivery={setDelivery}                
            />

            <Text style={ Typography.label }>Kommentar</Text>
            <TextInput
                style={ Forms.input }
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};