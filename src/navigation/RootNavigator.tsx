import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';
import LogYourActionScreen from '../screens/main/LogYourActionScreen';
import LevelScreen from '../screens/main/LevelScreen';
import AchievementsScreen from '../screens/main/AchievementsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="LogYourAction" component={LogYourActionScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  );
}
