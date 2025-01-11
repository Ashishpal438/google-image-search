import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';

const GoogleLensResults = ({searchResults, loading}) => {
  const [searchResults_, setSearchResults] = useState([
    {
      image:
        'https://avatars.preply.com/i/logos/i/logos/3815167.ccfabea1ba.JPG',
      image_height: 280,
      image_width: 320,
      link: 'https://preply.com/en/tutor/2209237',
      position: 1,
      source: 'Preply',
      source_icon:
        'https://serpapi.com/searches/67825f04dbaf92ea787c1c12/images/63d21bf8bf2fc76fe307a53adbf63a3eb049d316412a8b85693c34b857a19a4d.png',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyGGxQF4El8IqOeBVFWz5v4xFCp1tsxTa08N2d7HB8kp3a0s5x',
      thumbnail_height: 225,
      thumbnail_width: 225,
      title:
        'Mónica C., 🤓Spanish Teacher with 10 years of experience. Focusing on conversational Spanish and Spanish for Business. 🚀Boost your Spanish abilities from beginner to expert. | Learn with Spanish Tutors',
    },
    {
      image:
        'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=1613306542023110',
      image_height: 2048,
      image_width: 1366,
      link: 'https://www.facebook.com/keyurphotos/posts/kvernufoss-iceland-kvernufoss-is-about-40-meters-high-although-the-waterfall-is-/1613307728689658/',
      position: 2,
      source: 'Facebook',
      source_icon:
        'https://serpapi.com/searches/67825f04dbaf92ea787c1c12/images/63d21bf8bf2fc76f17dccaea43bc27cd4ec7bf434e813d1cd03f83f64294419c.png',
      thumbnail:
        'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRr2r_RoWz8Tge7IKNu2ewUruLxuw4yEVb6PptNKcb0_TTlxFFR',
      thumbnail_height: 275,
      thumbnail_width: 183,
      title:
        'Kvernufoss, Iceland Kvernufoss is... - Keyur Photography | Facebook',
    },
    // Add more results here
  ]);

  // Open link in browser
  const handleOpenLink = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open link:', err),
    );
  };

  // Render each item in the FlatList
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleOpenLink(item.link)}
      style={styles.card}>
      {/* Thumbnail or Image */}
      <Image
        source={{uri: item.thumbnail}}
        style={[styles.thumbnail]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        {/* Source */}
        <View style={styles.sourceContainer}>
          <Image
            source={{uri: item.source_icon}}
            style={styles.sourceIcon}
            resizeMode="contain"
          />
          <Text style={styles.sourceText}>{item.source}</Text>
        </View>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
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
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.position.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    width: '45%',
    margin: 10,
  },
  thumbnail: {
    width: '100%',
    height: 120,
  },
  content: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C0C1C1',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  sourceText: {
    fontSize: 14,
    color: '#ccc',
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

export default GoogleLensResults;
