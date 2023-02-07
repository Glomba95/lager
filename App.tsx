import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from './styles';

import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from './components/Deliveries';
// import Product from './interfaces/product';

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Leveranser": "ios-car",
};

const Tab = createBottomTabNavigator();

export default function App() {
  // REVIEW useState<Product[]>([]); Varför fungerar det inte?
  const [products, setProducts] = useState([]);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";
      
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => < Pick setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Leveranser">
          {()=> <Deliveries products={products} setProducts={setProducts} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}