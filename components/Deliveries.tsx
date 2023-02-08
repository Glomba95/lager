import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries({products, setProducts}) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={DeliveriesList} />
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps} products={products} setProducts={setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
