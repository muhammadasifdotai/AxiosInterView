import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        setPhotos(response.data);
      } catch (err) {
        setError('Failed to fetch photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.photoContainer}>
          <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    margin: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default App;
