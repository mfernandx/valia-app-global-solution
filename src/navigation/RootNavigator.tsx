import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import AppTabNavigator from './AppTabNavigator';
import { useAuth } from '../hooks/useAuth';
import WorkShiftNavigator from './WorkShiftNavigator';
import WorkShiftAnalysisScreen from '../screens/private/WorkShiftAnalysisScreen';
import WorkConditionNavigator from './WorkConditionNavigator';
import EmploymentNavigator from './EmploymentNavigator';
import EditProfileScreen from '../screens/private/EditProfileScreen';
import CreateCommunityPostScreen from '../screens/private/CreateCommunityPostScreen';
import CommunityPostDetailsScreen from '../screens/private/CommunityPostDetailsScreen';
import RightDetailsScreen from '../screens/private/RightDetailsScreen';

export type RootStackParamList = {
    App: undefined;
    WorkShifts: undefined;
    WorkShiftAnalysis: undefined;
    WorkConditions: undefined;
    Employments: undefined;
    EditProfile: undefined;
    CreateCommunityPost: undefined;
    CommunityPostDetails: { postId: string };
    RightDetails: { categoryId: string };
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
                    <Stack.Screen name="WorkConditions" component={WorkConditionNavigator} />
                    <Stack.Screen name="Employments" component={EmploymentNavigator} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="CreateCommunityPost" component={CreateCommunityPostScreen} />
                    <Stack.Screen name="CommunityPostDetails" component={CommunityPostDetailsScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="RightDetails" component={RightDetailsScreen} options={{ headerShown: false }}/>
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

