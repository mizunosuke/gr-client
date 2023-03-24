import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import defaultImage from "../assets/splash.png"
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export const PostHome = () => {

  const navigation = useNavigation();
  const [ image, setImage ] = useState(null); //選択した画像を保存する
  
  //写真をライブラリから選択
  const pickImage = async() => { 
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    //キャンセルされなければ画像のuriをimage変数に入れる
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  //fishListコンポーネントに移動
  const showFishList = () => {
    navigation.navigate("FishList");
  }

  const sendPost = () => {
    axios.post("pythonの画像処理をするAPIのパス",{
      image_uri: image, //画像
      gereration, //iPhoneの世代
    })
  }

  return (
    <View style={{
      backgroundColor: "#08073D",
      flex: 1
    }}>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        height: "35%"
      }}>
        {image
          ? <Image source={{ uri: image }} style={{ width: "90%", height: "100%" }} />
          : <Image source={defaultImage} style={{ width: "90%", height: "100%" }} />
        }
      </View>
      <View style={{
        flexDirection: "row",
        height: "20%",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <View style={{
          flex: 1,
          marginRight: "2%",
          marginLeft: "2%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')} labelStyle={{fontSize: 24, paddingVertical: 18}} style={{
            width: "95%",
            height: "80%",
          }}>
            写真を撮る
          </Button>
        </View>
        <View style={{
          flex: 1,
          marginRight: "2%",
          marginLeft: "2%",
          height: "100%",
          justifyContent: "center"
        }}>
          <Button icon="image" mode="contained" onPress={pickImage} labelStyle={{fontSize: 24, paddingVertical: 18}} style={{
            width: "95%",
            height: "80%",
          }}>
            画像を選択
          </Button>
        </View>
      </View>

      <View style={{
        flexDirection: "column",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
      }}>
        <Button icon="fish" mode="contained" onPress={showFishList} labelStyle={{fontSize: 24, paddingVertical: 18}} 
          style={{
            width: "95%",
            height: "100%",
            backgroundColor: "white"
          }}
          contentStyle={{height: "100%"}}
          buttonColor="white"
          textColor='#08073D'
          >
            魚種を選択
        </Button>
      </View>
      <View style={{
        flexDirection: "column",
        height: "10%",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Button icon="send" mode="contained" onPress={sendPost} labelStyle={{fontSize: 24, paddingVertical: 18}} 
          style={{
            width: "95%",
            height: "100%",
            backgroundColor: "white"
          }}
          contentStyle={{height: "100%"}}
          buttonColor="white"
          textColor='#08073D'
          >
            投稿する
        </Button>
      </View>
    </View>
  )
}
