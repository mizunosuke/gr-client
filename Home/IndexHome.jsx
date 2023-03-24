import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RankingAllList } from "./Ranking/RankingAllList";
import { RankingDetail } from "./Ranking/RankingDetail";

const Stack = createNativeStackNavigator();

export const IndexHome = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="RankingAllList" component={RankingAllList} options={{headerShown:false}}/>
        <Stack.Screen name="RankingDetail" component={RankingDetail} />
    </Stack.Navigator>
  )
}