import { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import MapView, { MapMarker } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { Base, Cards, Typography } from "../../styles";

import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route }) {
    const { order } = route.params;
    const [ marker, setMarker ] = useState(null);
    const [ locationMarker, setLocationMarker ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState<string|null>(null);
    
    // For target location
    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={order.address}
            />); 
        })();
    }, []);
    
    
    // For current user location
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied.");
                return;
            }
            
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude, 
                    longitude: currentLocation.coords.longitude    
                }}
                title="Min position"
                pinColor="blue"
            />);
        })();
    }, []);


    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Leveransinformation</Text>
            <View style={Cards.card2}>
                <Text style={Cards.cardTitle}>Order ID: #{order.id}</Text>
                <Text style={Cards.cardInfo}>{order.name}</Text>
                <Text style={Cards.cardInfo}>{order.address}</Text>
                <Text style={Cards.cardInfo}>{order.zip} {order.city}</Text>
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}>
                    { marker }
                    { locationMarker }
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 6,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});