import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import More from '../../screens/More';
import Notifications from '../../screens/Notifications';
import History from '../../screens/History';
import Home from '../../screens/Home';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomTab;
