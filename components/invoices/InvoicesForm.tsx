import { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../../styles';

import OrderDropDown from "./OrderDropDown";
import DateDropDown from "../DateDropDown";

import invoiceModel from "../../models/invoices";

import Invoice from "../../interfaces/invoice";


export default function InvoicesForm({navigation}) {

    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    
    async function createInvoice() {
        await invoiceModel.createInvoice(invoice);
        
        navigation.navigate("List", {reload: true});
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Skapa faktura</Text>

            <Text style={Typography.label}>Order</Text>
            <OrderDropDown
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


