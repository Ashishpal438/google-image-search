import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const MoreScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>MoreScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#1E2025',
  },
});

export default MoreScreen;
