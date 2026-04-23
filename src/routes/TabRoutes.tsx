import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import TaskStackRoutes from './TaskStackRoutes';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { useAuth } from '../hooks/useAuth';
import { TabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabRoutes() {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName={user?.role === 'admin' ? 'Settings' : 'Home'}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TaskStackRoutes} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}