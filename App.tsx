import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import { Base } from './styles';

import Home from "./components/Home";
import Pick from "./components/orders/Pick";
import Deliveries from './components/deliveries/Deliveries';
import Invoices from './components/invoices/Invoices';
import Auth from './components/auth/Auth';
import Ship from './components/ship/Ship';

import productModel from "./models/products";
import authModel from "./models/auth";

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleverans": "ios-car",
  "Faktura": "cash-outline",
  "Logga in": "lock-closed",
  "Leverans": "home"
};

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      setProducts(await productModel.getProducts());
      setIsLoggedIn(await authModel.loggedIn());
    })();
  }, []);

  return (
    <PaperProvider>
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
              {() => <Home products={products} />}
            </Tab.Screen>
            <Tab.Screen name="Plock">
              {() => <Pick setProducts={setProducts} />}
            </Tab.Screen>
            <Tab.Screen name="Inleverans">
              {() => <Deliveries products={products} setProducts={setProducts} />}
            </Tab.Screen>
            {isLoggedIn ?
              <Tab.Screen name="Faktura">
                {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
              </Tab.Screen> :
              <Tab.Screen name="Logga in">
                {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
              </Tab.Screen>
            }
              <Tab.Screen name="Leverans" component={Ship} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}