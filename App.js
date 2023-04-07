import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import axios from 'axios';
import { Bottombar } from './components/Bottombar';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState(null);
  const [ user, setUser ] = useState(null);

  const handleRegistration = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirm);
    if (icon) {
      formData.append('icon', icon);
    }

    try {
      const { data } = await axios.post('https://1eaa-2404-7a87-660-1800-82d-69db-832c-4527.jp.ngrok.io/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-TOKEN': await fetchCsrfToken(),
        },
      });
      console.log(data);
      setUser(data);
      saveToken(data); // トークンを保存する
    } catch (e) {
      console.error(e);
      setError('Failed to register');
    }
  };

  const fetchCsrfToken = async () => {
    const { data } = await axios.get('https://1eaa-2404-7a87-660-1800-82d-69db-832c-4527.jp.ngrok.io/csrf-cookie');
    console.log(data);
    return data.csrf_token;
  };

  //トークンを保存する関数
  const saveToken = async (token) => {
    try {
      console.log(token);
      const jsonValue = JSON.stringify(token)
      await AsyncStorage.setItem('@token', jsonValue);
    } catch (e) {
      console.log('Failed to save token');
    }
  }

  //トークンを削除する関数
  const handleLogout = async () => {
    try {
    await AsyncStorage.removeItem('@token');
    setUser(null); // ログアウト状態にする
    } catch (e) {
    console.log('Failed to remove token');
    }
};


  useEffect(() => {
    const checkToken = async () => {
      const token = await fetchCsrfToken();
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({ token }); // ログイン状態にする
      }
    };
  
    checkToken();
  }, []);



  return (
    <>
      { user == null ? (
        <View style={styles.container}>
          <Text style={styles.title}>Registration</Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Bottombar/>
          <Button  title="ログアウト"  onPress={handleLogout} />
        </>
      )}
    </>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
