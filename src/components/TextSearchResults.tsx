import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TextSearchResults = ({textSearchResults, loading}) => {
  const renderImageItem = ({item}: {item: any}) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={{uri: item.thumbnail}} style={styles.imageThumbnail} />
      <Text numberOfLines={1} style={styles.imageTitle}>
        {item.title}
      </Text>
      <Text numberOfLines={1} style={styles.imageSource}>
        {item.source_name}
      </Text>
    </TouchableOpacity>
  );

  const renderResultItem = ({item}: {item: any}) => (
    <TouchableOpacity style={styles.resultContainer}>
      <View style={styles.resultHeader}>
        <Image source={{uri: item.favicon}} style={styles.resultFavicon} />
        <Text numberOfLines={1} style={styles.resultSource}>
          {item.source}
        </Text>
      </View>
      <Text numberOfLines={2} style={styles.resultTitle}>
        {item.title}
      </Text>
      <Text numberOfLines={3} style={styles.resultSnippet}>
        {item.snippet}
      </Text>
    </TouchableOpacity>
  );

  // Show loader if loading is true
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loaderText}>Fetching results...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Images Section */}

      <View style={styles.mb10}>
        <FlatList
          data={textSearchResults.inline_images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => `image-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageList}
        />
      </View>

      {/* Organic Results Section */}
      <FlatList
        data={textSearchResults.organic_results}
        renderItem={renderResultItem}
        keyExtractor={(item, index) => `result-${index}`}
        style={styles.resultsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  imageList: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  imageContainer: {
    marginRight: 10,
    width: 120,
  },
  imageThumbnail: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  imageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  imageSource: {
    fontSize: 12,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  resultsList: {
    paddingHorizontal: 15,
  },
  resultContainer: {
    marginBottom: 15,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultFavicon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  resultSource: {
    fontSize: 12,
    color: '#555',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#67686A',
  },
  resultSnippet: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
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

export default TextSearchResults;
