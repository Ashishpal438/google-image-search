import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const SearchBar = ({
  setSearchResults,
  setLoading,
  setTextSearchResults,
  textSearchResults,
  loading,
}) => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [seggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
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
    const apiKey = API_KEY;
    const googleLensUrl = 'https://serpapi.com/search';

    try {
      const uploadedImageUrl = await uploadImageToServer(imageUri);
      console.log('uploaded Image url ---->', uploadedImageUrl);
      if (!uploadedImageUrl) {
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
      setLoading(true);
      setInput('');
      setSuggestions([]);
      setTextSearchResults([]);
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        await performGoogleLensSearch(imageUri);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  type prop = {
    text?: string;
  };
  const fetchData = async (text?: prop) => {
    try {
      setLoading(true);
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          engine: 'google',
          q: text ? text : input,
          api_key: API_KEY,
        },
      });
      console.log(response.data);
      setTextSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error.message);
    }
  };

  const handleInputChange = text => {
    setInput(text);

    // Clear the previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(async () => {
      if (text.trim() !== '') {
        await fetchData();
      }
    }, 3000);

    setDebounceTimeout(newTimeout);
  };

  const autocomplete = async () => {
    try {
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          engine: 'google_autocomplete',
          q: input,
          api_key: API_KEY,
        },
      });
      setSuggestions(response.data?.suggestions);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    if (input) {
      autocomplete();
    }
  }, [input]);

  const renderSuggestion = ({item}) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        fetchData(item.value);
        setSuggestions([]);
      }}>
      <MaterialIcon name={'history-toggle-off'} size={25} color={'#808488'} />
      <Text style={styles.suggestionValue}>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <>
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
          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{uri: selectedImage}} style={styles.image} />
            </View>
          )}
          <TextInput
            style={styles.search}
            placeholder="Search"
            placeholderTextColor={'#9A9FA0'}
            value={input}
            onChangeText={handleInputChange}
          />
        </View>
        <View style={styles.innerBox2}>
          <Icon name="mic" size={25} color="#fff" />
          <TouchableOpacity onPress={handleGallery}>
            <Icon name="camera-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {seggestions.length > 0 || !textSearchResults ? (
        <View style={styles.suggestionContainer}>
          <View style={styles.recentSearched}>
            <Text style={styles.recentText}>Recent Searches</Text>
            <Text style={styles.recentText}>Manage History</Text>
          </View>
          <FlatList
            data={seggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSuggestion}
          />
        </View>
      ) : (
        // Show loader if loading is true
        loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.loaderText}>Fetching results...</Text>
          </View>
        )
      )}
    </>
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
  suggestionContainer: {
    flex: 1,
    marginTop: 10,
    borderRadius: 20,
  },
  suggestionItem: {
    flexDirection: 'row',
    gap: 10,
    padding: 5,
    marginBottom: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  suggestionValue: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#fff',
  },
  suggestionRelevance: {
    fontSize: 14,
    color: '#555',
  },
  recentSearched: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  recentText: {
    color: '#85868B',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
});

export default SearchBar;
