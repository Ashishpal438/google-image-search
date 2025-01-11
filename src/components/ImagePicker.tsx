import React, {useState} from 'react';
import {View, Button, Image, StyleSheet, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    try {
      const result = await launchCamera(options);
      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Could not access the camera.');
    }
  };

  const handleGallery = async () => {
    const options = {
      mediaType: 'photo',
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Could not access the gallery.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={handleCamera} />
      <View style={styles.spacer} />
      <Button title="Choose from Gallery" onPress={handleGallery} />
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{uri: selectedImage}} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 16,
    backgroundColor: 'red',
  },
  spacer: {height: 16},
  imageContainer: {marginTop: 16},
  image: {width: 200, height: 200, borderRadius: 8},
});

export default ImagePicker;
