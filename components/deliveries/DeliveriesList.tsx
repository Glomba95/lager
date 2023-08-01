import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Base, Typography, Cards } from '../../styles';

import deliveryModel from '../../models/deliveries';

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);
    
    if (reload) {
        route.params.reload = false;
        reloadDeliveries();
    }
    
    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);


    const listOfDeliveries = allDeliveries
    .map((delivery, index) => {
        return (
            <View
                key={index}
                style={Cards.card}>
                <Text style={Cards.cardTitle}>{ delivery.product_name } - { delivery.amount } st</Text>
                <Text style={Cards.cardInfo}>Mottagen: { delivery.delivery_date }</Text>
                <Text style={ Cards.cardInfo }>Kommentar: {delivery.comment}</Text>
            </View>
        );
    });
    
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            <ScrollView>
                <View style={Cards.cardContainer}>
                    {listOfDeliveries.length === 0 
                        ? <Text style={Typography.normal}>Inga inleveranser finns registrerade.</Text> 
                        : listOfDeliveries}
                    <Button
                        title="Skapa ny inleverans"
                        onPress={() => {
                            navigation.navigate('Form');
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};