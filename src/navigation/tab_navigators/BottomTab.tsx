import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import More from '../../screens/More';
import Notifications from '../../screens/Notifications';
import History from '../../screens/History';
import Home from '../../screens/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#313135',
        },
        tabBarIconStyle: {marginTop: 10},
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-filled';
          } else if (route.name === 'History') {
            iconName = 'history-toggle-off';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-none';
          } else {
            iconName = 'menu';
          }

          return focused ? (
            <View style={styles.activeIconStyle}>
              <Icon name={iconName} size={25} color={'#8AB4F8'} />
            </View>
          ) : (
            <Icon name={iconName} size={25} color={'#808488'} />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIconStyle: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#384256',
    borderRadius: 20,
  },
});

export default BottomTab;
