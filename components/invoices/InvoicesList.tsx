import { useState, useEffect } from "react";
import { ScrollView, Text, Button } from "react-native";
import { DataTable } from "react-native-paper";
import { Base, Typography } from "../../styles";

import Invoice from '../../interfaces/invoice';
import invoiceModel from '../../models/invoices';
import authModel from '../../models/auth';


export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
    
    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }
    
    if (reload) {
        reloadInvoices();
    }
    
    useEffect(() => {
        reloadInvoices();
    }, []);
    
    async function logOut() {
        authModel.logout();
        setIsLoggedIn(false);
    }
    
    const invoiceRows = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });
    
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            
            {invoiceRows.length === 0?
                <Text>Inga registrerade Fakturor.</Text> :
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Kund</DataTable.Title>
                        <DataTable.Title /* numeric*/>Belopp</DataTable.Title>
                        <DataTable.Title>Förfallodatum</DataTable.Title>
                    </DataTable.Header>
                    {invoiceRows}
                </DataTable>
            }
            
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            
            <Button 
                title="Logga ut"
                onPress={async() => {
                    await logOut();
                }}
            />
        </ScrollView>
    );
}
