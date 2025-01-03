import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from '../tab_navigators/BottomTab';
import History from '../../screens/History';
import Notifications from '../../screens/Notifications';
import More from '../../screens/More';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  const initialRouteName = 'HomeScreen';
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={BottomTab} />
      <Stack.Screen name="HistoryScreen" component={History} />
      <Stack.Screen name="NotificationsScreen" component={Notifications} />
      <Stack.Screen name="MoreScreen" component={More} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
