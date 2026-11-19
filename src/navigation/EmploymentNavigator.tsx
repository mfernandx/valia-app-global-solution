import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmploymentFormScreen from '../screens/private/EmploymentFormScreen';
import EmploymentDetailsScreen from '../screens/private/EmploymentDetailsScreen';
import EmploymentListScreen from '../screens/private/EmploymentListScreen';

export type EmploymentStackParamList = {
    EmploymentList: undefined;
    EmploymentForm: { employmentId?: string };
    EmploymentDetails: { employmentId: string };
};

const Stack = createNativeStackNavigator<EmploymentStackParamList>();

export default function EmploymentNavigator() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EmploymentList" component={EmploymentListScreen} />
            <Stack.Screen name="EmploymentForm" component={EmploymentFormScreen} />
            <Stack.Screen name="EmploymentDetails" component={EmploymentDetailsScreen} />
        </Stack.Navigator>
    );
    
}
