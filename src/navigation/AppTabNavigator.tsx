import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/private/HomeScreen';
import RightsScreen from '../screens/private/RightsScreen';
import CommunityScreen from '../screens/private/CommunityScreen';
import ProfileScreen from '../screens/private/ProfileScreen';

export type AppTabParamList = {
    Inicio: undefined;
    Direitos: undefined;
    Comunidade: undefined;
    Perfil: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabNavigator() {

    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#812443',
                tabBarInactiveTintColor: '#30212A',
                tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
                tabBarStyle: {
                    backgroundColor: '#FFF7F1',
                    borderTopColor: '#EAD8D3',
                    borderTopWidth: 1,
                    height: 62 + insets.bottom,
                    paddingTop: 7,
                    paddingBottom: Math.max(insets.bottom, 8),
                },
                tabBarIcon: ({ focused, color, size }) => {
                    const icons: Record<keyof AppTabParamList, React.ComponentProps<typeof Ionicons>['name']> = {
                        Inicio: focused ? 'home' : 'home-outline',
                        Direitos: focused ? 'shield-checkmark' : 'shield-checkmark-outline',
                        Comunidade: focused ? 'people' : 'people-outline',
                        Perfil: focused ? 'person' : 'person-outline',
                    };

                    return <Ionicons name={icons[route.name]} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Inicio" component={HomeScreen} options={{ tabBarLabel: 'Início' }} />
            
            <Tab.Screen name="Direitos" component={RightsScreen} />
            
            <Tab.Screen name="Comunidade" component={CommunityScreen} />
            
            <Tab.Screen name="Perfil" component={ProfileScreen} />
            
        </Tab.Navigator>
    );
}
