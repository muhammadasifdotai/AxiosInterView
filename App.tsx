import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Album {
  userId: number;
  id: number;
  title: string;
}

const App = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const renderItem = ({ item }: { item: Album }) => (
    <View style={styles.albumContainer}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={albums}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
