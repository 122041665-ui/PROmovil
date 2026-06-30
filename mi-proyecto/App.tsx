import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ArtesanosScreen from './screens/ArtesanosScreen';
import ConsideracionScreen from './screens/ConsideracionScreen';
import HomeScreen from './screens/HomeScreen';
import PerfilArtesanoScreen from './screens/PerfilArtesanoScreen';
import PerfilScreen from './screens/PerfilScreen';
import { ArtesanosStackParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<ArtesanosStackParamList>();

function ArtesanosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3b82f6' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="ListaArtesanos"
        component={ArtesanosScreen}
        options={{ title: 'Artesanos' }}
      />
      <Stack.Screen
        name="PerfilArtesano"
        component={PerfilArtesanoScreen}
        options={{ title: 'Perfil del artesano' }}
      />
    </Stack.Navigator>
  );
}

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
          name="Artesanos"
          component={ArtesanosStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Proyecto"
          component={ConsideracionScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
