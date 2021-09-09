import React, {useEffect, useState} from 'react';
import {
  Pressable,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const Messages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsersData(users);
        setIsLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={usersData}
      renderItem={({item}) => (
        <View
          style={{
            // height: 50,
            // backgroundColor: '#f5f5f5',
            // flex: 1,
            alignItems: 'flex-end',
            // justifyContent: 'flex-end',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 10, fontWeight: '200', paddingVertical: 3}}>
            {item.userPhone.slice(-8)}
          </Text>
          <Text
            style={{
              backgroundColor: '#4169E1',
              color: 'white',
              padding: 5,
              borderRadius: 8,
            }}>
            {item.text}
          </Text>
        </View>
      )}
    />
  );
};

export default Messages;
