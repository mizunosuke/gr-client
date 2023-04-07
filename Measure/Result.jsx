import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const Result = (props) => {
    console.log(props);
    const navigation = useNavigation();
    const image = props.route.params.image;
    const size = props.route.params.data.data.result;

    return (
        <View style={{
            flex:1,
            flexDirection: "column",
            backgroundColor: "#08073D"
        }}>
            <Text style={{
                textAlign: "center",
                fontSize: 28,
                fontWeight: "bold",
                height:100,
                paddingVertical:25,
                color: "white"
            }}>計測結果</Text>

            <Image source={{uri: image}} style={{
                width: "95%",
                height: 380,
                alignSelf: "center",
                marginBottom: 7,
                shadowOffset: {
                    width:9,
                    height:5
                },
                shadowColor: "white",
                shadowOpacity: 0.7,
                elevation: 24,
                borderWidth: 1,
                borderColor: "white"
            }}/>

            <Text style={{
                textAlign: "center",
                fontSize: 40,
                fontWeight: "bold",
                paddingVertical:19,
                color: "white"
            }}>{size}cm</Text>

            <Button icon="camera" mode="outlined" onPress={() => navigation.navigate("MeasureHome")} contentStyle={{height: '100%'}} labelStyle={{fontSize: 24, paddingVertical: 10, color: "white"}} style={{
            marginHorizontal: 90,
            height: 60,
            borderWidth: 3,
            borderColor: "white",
            backgroundColor: "#00AED4"
            }}>
            戻る
            </Button>
        </View>
    )
}