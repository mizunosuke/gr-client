import { View, Text } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MypageHome } from "./MypageHome";
import { EditMypage } from "./EditMypage";

const Stack = createNativeStackNavigator();

export const IndexMypage = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="MypageHome" component={MypageHome} options={{headerShown:false}}/>
        <Stack.Screen name="EditMypage" component={EditMypage} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}