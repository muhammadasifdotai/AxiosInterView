import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={user => user.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Phone: {item.phone}</Text>
            <Text>Company: {item.company.name}</Text>
            <Text style={{ color: 'gray' }}>{item.address.city}, {item.address.street}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UsersList;
