import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const AiBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://imgs.search.brave.com/V7sgagRATLlWoAL9kKkWlvM1Lymxxb-2sk6dz3LnYrk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2MxL0dvb2dsZV8l/MjJHJTIyX2xvZ28u/c3Zn',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.text}>Search</Text>
      </View>
      <Image
        source={require('../assets/google-gemini-icon.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 40,
    backgroundColor: '#2E3331',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
  },
  searchContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: '#1E2025',
  },
  text: {
    color: '#fff',
  },
  image: {
    height: 20,
    width: 20,
  },
});

export default AiBox;
