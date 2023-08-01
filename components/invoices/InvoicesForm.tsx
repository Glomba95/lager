import { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../../styles';

import OrderDropDown from "./OrderDropDown";
import DateDropDown from "../DateDropDown";

import invoiceModel from "../../models/invoices";
import orderModel from "../../models/orders";

import Invoice from "../../interfaces/invoice";
import Order from "../../interfaces/order";



export default function InvoicesForm({navigation}) {
    const [invoiceOrders, setInvoiceOrders] = useState<Order[]>([]);
    const [invoice, setInvoice] = useState<Partial<Invoice>>({
        creation_date: new Date().toLocaleDateString('se-SV')
    }); 
    
    useEffect(() => {
        (async () => {
            let orders = await orderModel.getOrders();
            
            setInvoiceOrders(orders.filter(order => order.status === "Packad"))
        })();
      }, []);
    
    async function createInvoice() {
        const response = await invoiceModel.createInvoice(invoice);
        
        navigation.navigate("List", {reload: true});
    }
    
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Skapa faktura</Text>

            <Text style={Typography.label}>Order</Text>
            <OrderDropDown
                orderList={invoiceOrders}
                invoice={invoice}
                setInvoice={setInvoice}
            />
            
            <Text style={Typography.label}>Datum</Text>
            <DateDropDown
                formObject={invoice}
                formObjectProp={"creation_date"}
                setFormObject={setInvoice}
            />
            
            <Button
                title="Skapa Faktura"
                onPress={() => {
                    createInvoice();
                }}
            />
        </ScrollView>
    );
}


