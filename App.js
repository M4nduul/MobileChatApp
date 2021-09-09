import React, {useEffect, useState} from 'react';
import {Pressable, View, Text, TextInput, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Login, Messages} from './components';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  main: {
    marginHorizontal: 20,
  },
});

export const App = () => {
  const [text, setText] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (onAuthStateChanged = user => {
        setUser(user);
      }),
    );
    return subscriber;
  }, []);

  const signOut = () => {
    auth().signOut();
  };
  const onSend = () => {
    try {
      firestore().collection('messages').add({
        userId: user.uid,
        userPhone: user.phoneNumber,
        createdAt: new Date().getMinutes(),
        text,
      });
    } catch (error) {
      console.log(error);
    }
    setText('');
  };

  return user ? (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={{alignItems: 'center', paddingTop: 30}}>
          <Text>User:</Text>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              // marginBottom: 15,
            }}>
            {user.phoneNumber.slice(-8)}
          </Text>
        </View>
        <Pressable onPress={signOut}>
          <Text
            style={{
              paddingTop: 30,
              fontWeight: 'bold',
              fontSize: 16,
              left: 40,
              color: '#4169E1',
              // marginBottom: 25,
            }}>
            Sign out
          </Text>
        </Pressable>
      </View>
      <View style={[{flex: 7}, styles.main]}>
        <Messages />
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10,
          }}>
          <TextInput
            placeholder="Message..."
            onChangeText={value => setText(value)}
            clearButtonMode="always"
            value={text}
            style={{
              flex: 5,
              padding: 8,
              height: 30,
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
            }}
          />
          <Pressable onPress={onSend} style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                paddingLeft: 15,
                paddingVertical: 5,
                // marginLeft: ,
                color: '#4169E1',
              }}>
              Send
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  ) : (
    <Login />
  );
};

export default App;
