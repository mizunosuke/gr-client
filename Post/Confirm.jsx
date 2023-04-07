import { Text, View, Button, TextInput, Image, StyleSheet } from "react-native"
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


export const Confirm = (props) => {
    console.log(props);
    const navigation = useNavigation();
    const [measuredLength, setMeasuredLength] = useState(null);

    const measureLength = async () => {
    if (!props || !measuredLength) {
        Alert.alert('Please select an image and enter measured length!');
        return;
        }
    }

    //入力値を再度APIに送る
    const handleMeasure = async() => {
        //APIに入力数値を送って計算結果を受け取る
        const length = await axios.post("https://gr-api-381909.an.r.appspot.com/measure",{
            lengths: measureLength
        })
        setMeasuredLength(null);
        //計測結果を持って投稿ページへ戻る
        navigation.navigate("PostHome",length);
    }

    return (
    <View style={styles.container}>
      {/* ここには返ってきた画像を表示させる */}
      {props && !measuredLength && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>基準となる物体の長さを入力 (cm):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setMeasuredLength(text)}
          />
        </View>
      )}
      {props && measuredLength && (
        <View style={styles.buttonsContainer}>
          <Button title="キャンセル" onPress={handleMeasure} />
          <Button title="計測" onPress={measureLength} />
        </View>
      )}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    imageContainer: {
      flex: 1,
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: 'black',
      marginVertical: 20,
    },
    image: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    inputLabel: {
      fontSize: 16,
      marginRight: 10,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "gray",
    },
})