import { useNavigation } from "@react-navigation/native";
import { View, Button, Text } from "react-native"

export const Success = (props) => {
    console.log(props);
    const navigation = useNavigation();

    const handlebackList = () => {
        navigation.navigate("RankingAllList");
    }

    const handlebackPost = () => {
        navigation.navigate("PostHome");
    }

    return (
        //投稿に成功したら投稿に成功しました画面を表示して、Post画面に戻る
        <View>
            <Text>投稿が完了しました！！</Text>
            <Button title="ランキング一覧へ戻る" onPress={handlebackList}/>
            <Button title="投稿画面へ戻る" onPress={handlebackPost}/>
        </View>
    )
}