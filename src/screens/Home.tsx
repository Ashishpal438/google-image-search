import {Text, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const Home = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header />
      <View style={styles.googleContainer}>
        <Text style={styles.google}>Google</Text>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#1E2025',
  },
  googleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  google: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 400,
  },
});

export default Home;
