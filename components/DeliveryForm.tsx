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
    const [delivery, setDelivery] = useState<Partial<Delivery>>({
        delivery_date: new Date().toLocaleDateString('se-SV')
    });
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    
    function validateForm() {
        return !!delivery.product_id && !!delivery.amount && !!delivery.delivery_date;
    }
    
    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        setProducts(await productModel.getProducts());

        navigation.navigate("List", { reload: true });
    };

    return (
        <ScrollView style={ Base.base }>
            <Text style={ Typography.header2 }>Ny inleverans</Text>
            
            <Text style={ Typography.label }>Produkt</Text>
            <ProductDropDown
                products={products}
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
                disabled={!validateForm()}
                onPress={() => {
                    validateForm();
                }}
            />
        </ScrollView>
    );
};