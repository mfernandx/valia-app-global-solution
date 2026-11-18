import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkShiftListScreen from '../screens/private/WorkShiftListScreen';
import CreateWorkShiftScreen from '../screens/private/CreateWorkShiftScreen';

export type WorkShiftStackParamList = {
    WorkShiftList: undefined;
    CreateWorkShift: undefined;
};

const Stack = createNativeStackNavigator<WorkShiftStackParamList>();

export default function WorkShiftNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WorkShiftList" component={WorkShiftListScreen} />
            <Stack.Screen name="CreateWorkShift" component={CreateWorkShiftScreen} />
        </Stack.Navigator>
    );
}
