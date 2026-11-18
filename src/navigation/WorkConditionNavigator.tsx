import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkConditionScreen from '../screens/private/WorkConditionScreen';
import CreateAssessmentScreen from '../screens/private/CreateAssessmentScreen';
import AssessmentDetailsScreen from '../screens/private/AssessmentDetailsScreen';

export type WorkConditionStackParamList = {
    WorkConditionList: undefined;
    CreateAssessment: { employmentId?: string } | undefined;
    AssessmentDetails: { assessmentId: string };
};

const Stack = createNativeStackNavigator<WorkConditionStackParamList>();

export default function WorkConditionNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WorkConditionList" component={WorkConditionScreen} />
            <Stack.Screen name="CreateAssessment" component={CreateAssessmentScreen} />
            <Stack.Screen name="AssessmentDetails" component={AssessmentDetailsScreen} />
        </Stack.Navigator>
    );
}
