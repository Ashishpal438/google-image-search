import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Setting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>A</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    borderRadius: '50%',
    backgroundColor: '#77929C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default Setting;
