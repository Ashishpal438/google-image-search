import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Setting from './Setting';
import Icon from 'react-native-vector-icons/Ionicons';
import AiBox from './AiBox';

const Header = () => {
  return (
    <View style={styles.container}>
      <Icon name="flask" size={25} color="#A8C6FB" />
      <AiBox />
      <Setting />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Header;
