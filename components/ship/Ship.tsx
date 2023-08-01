import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Ship() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipList} />
            <Stack.Screen name="Order">
                {(screenProps) => <ShipOrder {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}