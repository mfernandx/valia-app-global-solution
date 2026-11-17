import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/public/LoginScreen';
import RegisterScreen from '../screens/public/RegisterScreen';
import { InicioScreen } from '../screens/public/InicioScreen';

export type AuthStackParamList = {
    Inicio: undefined;
    Login: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Inicio"

            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: {
                    backgroundColor: '#FFF7F1',
                },
            }}
        >
            <Stack.Screen name="Inicio" component={InicioScreen}/>
            
            <Stack.Screen name="Login" component={LoginScreen}/>

            <Stack.Screen name="Register" component={RegisterScreen}/>
            
        </Stack.Navigator>
    );
}
