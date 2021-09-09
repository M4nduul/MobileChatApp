import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, TextInput, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    width: 250,
    height: 250,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: '#808080',
    borderWidth: 0.2,
    shadowOpacity: 1,
    shadowRadius: 100,
    shadowColor: '#4169E1',
  },
  textInput: {
    padding: 8,
    height: 40,
    borderRadius: 8,
    width: 200,
    backgroundColor: 'white',
    margin: 3,
    color: '#515154',
  },
  btn: {
    padding: 8,
    color: '#4169E1',
    borderRadius: 8,
    borderColor: '#4169E1',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export const Login = () => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [code, setCode] = useState('');

  const signInWithPhoneNumber = async phoneNumber => {
    if (phoneNumber.length === 13) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setIsConfirmed(true);
      setConfirm(confirmation);
    } else {
      alert('Invalid number!');
    }
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      alert('Invalid code');
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            padding: 20,
            color: '#515154',
          }}>
          Login
        </Text>
        <View>
          <TextInput
            onChangeText={phoneNumber => setPhoneNumber(`+976 ${phoneNumber}`)}
            placeholder="Phone number..."
            keyboardType="numeric"
            style={styles.textInput}
          />
          <TextInput
            onChangeText={text => setCode(text)}
            placeholder="Verify code..."
            keyboardType="numeric"
            style={styles.textInput}
          />
        </View>
        {isConfirmed ? (
          <Pressable title="Confirm code" onPress={confirmCode}>
            <Text style={styles.btn}>Log in</Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              title="Confirm code"
              onPress={() => signInWithPhoneNumber(phoneNumber)}>
              <Text style={styles.btn}>Get verification code</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default Login;
