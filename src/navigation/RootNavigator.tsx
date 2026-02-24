import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';
import LogYourActionScreen from '../screens/main/LogYourActionScreen';
import LevelScreen from '../screens/main/LevelScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="LogYourAction" component={LogYourActionScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
    </Stack.Navigator>
  );
}
