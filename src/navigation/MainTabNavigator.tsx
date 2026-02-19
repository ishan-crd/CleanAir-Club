import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/main/HomeScreen';
import StatsScreen from '../screens/main/StatsScreen';
import SocialScreen from '../screens/main/SocialScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Stats: 'bar-chart',
  Social: 'trophy',
  Profile: 'person',
};

function CenterTabButton() {
  const navigation = useNavigation();
  const rootNav = navigation.getParent();
  const openLogAction = () => {
    if (rootNav && 'navigate' in rootNav) {
      (rootNav as { navigate: (name: string) => void }).navigate('LogYourAction');
    }
  };
  return (
    <View style={styles.centerButtonWrap}>
      <TouchableOpacity style={styles.centerButton} onPress={openLogAction} activeOpacity={0.8}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#0F9F59',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarLabelStyle: { fontSize: 10 },
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICONS.Home} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: 'STATS',
          tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICONS.Stats} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={function AddPlaceholder() {
          return <View style={{ flex: 1, backgroundColor: '#F6F8F7' }} />;
        }}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
          tabBarButton: () => <CenterTabButton />,
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarLabel: 'SOCIAL',
          tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICONS.Social} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({ color, size }) => <Ionicons name={TAB_ICONS.Profile} size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 88 : 68,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 16 },
    }),
  },
  tabBarItem: {
    paddingTop: 4,
  },
  centerButtonWrap: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F9F59',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
});
