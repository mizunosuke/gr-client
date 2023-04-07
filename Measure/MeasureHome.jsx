import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import defaultImage from "../assets/camera.png"
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const MeasureHome = (props) => {

  const [ kind, setKind ] = useState();
  const navigation = useNavigation();
  const [ image, setImage ] = useState(null); //選択した画像のbase64を保存する
  const [ generation, setGeneration ] = useState("");
  const [ color, setColor] = useState("");
  const [ exif, setExif ] = useState(null);
  const [ date, setDate ] = useState("");
  const [ isOpen, setIsOpen ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ showImage, setShowImage ] = useState(""); //画像表示用のステート
  const [ user, setUser ] = useState();
  const [ size, setSize ] = useState();


  //色の選択肢
  const colorOptions = [
    { label: '赤', value: 'red' },
    { label: '青', value: 'blue' },
    { label: '緑', value: 'green' },
    { label: '黄', value: 'yellow' },
    { label: '橙', value: 'orange' },
    { label: '黒', value: 'black' },
    { label: '白', value: 'white' },
    { label: '銀', value: 'silver' },
  ];

  
  //写真をライブラリから選択
  
const pickImage = async() => { 
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
    exif: true, 
    base64: true,
    allowsEditing: true
  });

  if (!result.cancelled) {
    // Set the resized image as the show image
    setShowImage(result.assets[0].uri);

    // Get the base64 representation of the resized image
    const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(base64Image);
    console.log(result);
    setImage(base64Image);
    setExif(result.exif);
    setDate(result.assets[0].exif.DateTimeOriginal);
    }
  }

  //fishListコンポーネントに移動
  const showFishList = () => {
    navigation.navigate("FishList");
  }

  //apiにデータを送信し、計算結果を返してもらう
  const sendPost = async() => {
    try {
      //まず輪郭検出のために画像をその他の情報を送る
      const lengths = await axios.post("https://gr-api-381909.an.r.appspot.com", {
        color: color,
        generation: generation,
        image: image,
        exif: exif
      });

      console.log(lengths);
      navigation.navigate("Result",{data: lengths, image: showImage});
      setImage(null);
      setKind("");
      setExif(null);
      setColor("");
      setShowImage("");
      setSize();
      setDate("");
    } catch (error) {
      console.log(error);
    }
  }


  //ユーザー情報取得
  const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@token')
    const parseValue = JSON.parse(jsonValue);
    console.log(parseValue);
    return parseValue;
    
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setUser(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (props.route.params?.kind) {
      setKind(props.route.params.kind);
    }
  }, [props.route.params?.kind]);

  return (
    <View style={{
      backgroundColor: "#08073D",
      flex: 1
    }}>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        height: "43%"
      }}>
        {showImage
          ? <Image source={{ uri: showImage }} style={{ width: "90%", height: "100%" }} />
          : <Image source={defaultImage} style={{ width: "90%", height: "100%" }} />
        }
      </View>

      <View style={{
        flexDirection: "row",
        height: "13%",
        marginTop: 10,
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
          <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')} contentStyle={{height: '100%'}} labelStyle={{fontSize: 24, paddingVertical: 10}} style={{
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
          <Button icon="image" mode="contained" onPress={pickImage} labelStyle={{fontSize: 24, paddingVertical: 10}} contentStyle={{height: '100%'}} style={{
            width: "95%",
            height: "80%",
          }}>
            画像を選択
          </Button>
        </View>
      </View>

      <View style={{
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: -50
      }}>
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
          }}>【！注意！】</Text>
          <Text style={{
            paddingTop: 5,
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
          }}>画像内には必ず【10円玉】を入れて撮影してください</Text>
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
          }}>画像内に影が映ると誤検知の可能性が高くなります</Text>
      </View>

      <View style={{
        flexDirection: "column",
        height: "7%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25
      }}>
        <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
          }}>背景色と10円玉の色味が近い場合にも</Text>
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
          }}>誤検出の可能性が高くなります</Text>
      </View>

      <View style={{
        flexDirection: "column",
        height: "6%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        zIndex: open ? 0 : 1 
      }}>
        <DropDownPicker
        items={colorOptions}
        value={color}
        defaultValue={colorOptions[0].value}
        closeAfterSelecting={true}
        placeholder={"魚体の色味を選択してください"}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        containerStyle={{ height: 40, width: 250 }}
        onSelectItem={(item) => setColor(item.value)}
        />
      </View>

      <View style={{
        flexDirection: "column",
        height: "6%",
        marginTop: 15,
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
            解析する
        </Button>
      </View>
    </View>
  )
}
