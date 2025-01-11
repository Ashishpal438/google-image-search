import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const SearchBar = ({setSearchResults, setLoading}) => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const API_KEY =
    '4a4cb89bc080d6a47c58a3db0fecfe4f1b334146fdf5959576eaa15ea0341cc3';

  // Upload the image to a server (e.g., Imgur or your backend)
  const uploadImageToServer = async imageUri => {
    const uploadUrl = 'https://api.imgur.com/3/upload'; // Example: Imgur API
    const clientId = 'ashishkpal'; // Replace with your Imgur Client ID

    try {
      const imageData = {
        uri: imageUri,
        type: 'image/jpeg', // Adjust this based on your image type
        name: 'image.jpg',
      };

      const formData = new FormData();
      formData.append('image', imageData);

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          Authorization: `Client-ID ${clientId}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.data.link; // Returns the public URL of the uploaded image
    } catch (error) {
      console.error('Image upload error:', error.response || error.message);
      Alert.alert('Error', 'Failed to upload the image.');
      return null;
    }
  };

  const performGoogleLensSearch = async imageUri => {
    setLoading(true);
    const apiKey = API_KEY;
    const googleLensUrl = 'https://serpapi.com/search';

    try {
      const uploadedImageUrl = await uploadImageToServer(imageUri);
      console.log('uploaded Image url ---->', uploadedImageUrl);
      if (!uploadedImageUrl) {
        setLoading(false);
        return;
      }

      // Step 2: Perform Google Lens Search
      const response = await axios.get(googleLensUrl, {
        params: {
          api_key: apiKey,
          engine: 'google_lens',
          url: uploadedImageUrl,
        },
      });

      if (response.data.visual_matches) {
        setSearchResults(response.data.visual_matches);
      } else {
        Alert.alert('No Results Found', 'Try another image.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Google Lens search error:', error);
      Alert.alert('Error', 'Failed to perform Google Lens search.');
    } finally {
      setLoading(false);
    }
  };

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
    };

    try {
      const result = await launchCamera(options);
      if (result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
        // search with serp api
        const result = await axios.get(
          'https://serpapi.com/search.json?engine=google_reverse_image&image_url=https://i.imgur.com/5bGzZi7.jpg',
        );
        console.log('result ---->', result);
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
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        // await performGoogleLensSearch(imageUri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          engine: 'google',
          q: input,
          api_key: 'secret_api_key',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    if (input) {
      fetchData();
    }
  }, [input]);

  return (
    <View style={styles.container}>
      <View style={styles.innerBox1}>
        {selectedImage ? (
          <FastImage
            style={styles.googleImage}
            source={{
              uri: 'https://imgs.search.brave.com/V7sgagRATLlWoAL9kKkWlvM1Lymxxb-2sk6dz3LnYrk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2MxL0dvb2dsZV8l/MjJHJTIyX2xvZ28u/c3Zn',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Icon name="search-outline" size={25} color="#9A9FA0" />
        )}
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{uri: selectedImage}} style={styles.image} />
          </View>
        ) : (
          <TextInput
            style={styles.search}
            placeholder="Search"
            placeholderTextColor={'#9A9FA0'}
            value={input}
            onChangeText={e => setInput(e)}
          />
        )}
      </View>
      <View style={styles.innerBox2}>
        <Icon name="mic" size={25} color="#fff" />
        <TouchableOpacity onPress={handleGallery}>
          <Icon name="camera-outline" size={25} color="#fff" />
        </TouchableOpacity>
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
  imageContainer: {marginTop: 0},
  image: {width: 50, height: 50, borderRadius: 8, paddingLeft: 5},
  googleImage: {
    height: 20,
    width: 20,
  },
});

export default SearchBar;
