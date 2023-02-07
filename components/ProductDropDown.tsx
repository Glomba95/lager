import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

import productModel from "../models/products";
import Product from "../interfaces/product";


export default function ProductDropDown(props) {
    // const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    // REVIEW Varför skapa ny useStatee istället för att skicka med från App? Eller skapa en lokal variabel ist för state?
    useEffect(() => {
        async function setProductsAsync(){
            props.setProducts(await productModel.getProducts());
        }
        
        setProductsAsync();
    }, []);

    const itemsList = props.products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}