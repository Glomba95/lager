import { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from "react-native";
import { Card } from "react-native-paper";
import { Base, Typography } from '../../styles';

import Order from "../../interfaces/order";
import orderModel from "../../models/orders";

export default function ShipList({ route, navigation }) {
    // const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    // if (reload) {
    //     reloadOrders();
    // }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);
        
    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return (
                <Card
                    key={index}
                    onPress={() => {
                        navigation.navigate('Order', {
                            order: order
                        });
                    }}
                >
                    <Card.Title title={order.name} subtitle={order.id} />
                </Card>
            );
        });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>
                Ordrar för leverans
            </Text>
            {listOfOrders}
        </ScrollView>
    )
}