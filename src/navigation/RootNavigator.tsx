import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import AppTabNavigator from './AppTabNavigator';
import { useAuth } from '../hooks/useAuth';
import WorkShiftNavigator from './WorkShiftNavigator';
import WorkShiftAnalysisScreen from '../screens/private/WorkShiftAnalysisScreen';

export type RootStackParamList = {
    App: undefined;
    WorkShifts: undefined;
    WorkShiftAnalysis: undefined;
    Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#542039" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <>
                    <Stack.Screen name="App" component={AppTabNavigator} />
                    <Stack.Screen name="WorkShifts" component={WorkShiftNavigator} />
                    <Stack.Screen name="WorkShiftAnalysis" component={WorkShiftAnalysisScreen} />
                </>
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF7F1'
    },
});

