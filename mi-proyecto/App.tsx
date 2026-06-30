import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ConsideracionScreen from './src/screens/ConsideracionScreen';
import HomeScreen from './src/screens/HomeScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            height: 60,
            paddingBottom: 8,
          },
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Tab.Screen
          name="Subastas"
          component={HomeScreen}
          options={{ title: 'Artisan Auction' }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
        />
        <Tab.Screen
          name="Proyecto"
          component={ConsideracionScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
