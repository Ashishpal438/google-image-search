import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerBox1}>
        <Icon name="search-outline" size={25} color="#9A9FA0" />
        <TextInput
          style={styles.search}
          placeholder="Search"
          placeholderTextColor={'#9A9FA0'}
        />
      </View>
      <View style={styles.innerBox2}>
        <Icon name="mic" size={25} color="#fff" />
        <Icon name="camera-outline" size={25} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'space-between',
    backgroundColor: '#2F3132',
    flexDirection: 'row',
    borderRadius: 50,
    padding: 20,
  },
  search: {
    flex: 1,
    fontSize: 25,
    color: '#9A9FA0',
    marginHorizontal: 15,
  },
  innerBox1: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerBox2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
});

export default SearchBar;
