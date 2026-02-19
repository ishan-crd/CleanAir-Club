import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import CityOnboardingScreen from '../screens/onboarding/CityOnboardingScreen';
import HowDoYouMoveScreen from '../screens/onboarding/HowDoYouMoveScreen';
import SeeYourImpactScreen from '../screens/onboarding/SeeYourImpactScreen';
import LetsMakeItSmarterScreen from '../screens/onboarding/LetsMakeItSmarterScreen';
import NextOnboardingScreen from '../screens/onboarding/NextOnboardingScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  CityOnboarding: undefined;
  HowDoYouMove: undefined;
  SeeYourImpact: undefined;
  LetsMakeItSmarter: undefined;
  NextOnboarding: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F6F8F7' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CityOnboarding" component={CityOnboardingScreen} />
      <Stack.Screen name="HowDoYouMove" component={HowDoYouMoveScreen} />
      <Stack.Screen name="SeeYourImpact" component={SeeYourImpactScreen} />
      <Stack.Screen name="LetsMakeItSmarter" component={LetsMakeItSmarterScreen} />
      <Stack.Screen name="NextOnboarding" component={NextOnboardingScreen} />
    </Stack.Navigator>
  );
}
