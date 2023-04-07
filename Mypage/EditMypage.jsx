import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export const EditMypage = (props) => {
    // console.log(props);
    const navigation = useNavigation();

    const { user } = props.route.params.user;
    const id = user.id;
    console.log(user);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [imageUri, setImageUri] = useState('');

    const handleSelectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        });

        if (!result.cancelled) {
        setImageUri(result.uri);
        }
    };

    const handleSave = async() => {
        //編集データをLaravelへ送る
        const response =  await axios.put(`https://1eaa-2404-7a87-660-1800-82d-69db-832c-4527.jp.ngrok.io/api/user/${id}`,{
            icon_path: imageUri,
            name: name,
            email: email
        });
        console.log(response.data);
        navigation.navigate("MypageHome", response.data);
    };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image style={styles.image} source={{ uri: imageUri }} />
      ) : (
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handleSelectImage}>
          <Text style={styles.imagePickerText}>Select Image</Text>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
    },
    imagePickerButton: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    imagePickerText: {
      fontSize: 16,
      color: 'gray',
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      paddingLeft: 16,
      marginBottom: 16,
    },
    saveButton: {
      width: '100%',
      height: 40,
      backgroundColor: 'blue',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonText: {
      fontSize: 16,
      color: 'white',
    },
  });