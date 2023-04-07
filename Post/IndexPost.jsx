import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PostHome } from "./PostHome";
import { FishList } from "./FishList"
import { Success } from "./Success";
import { Confirm } from "./Confirm";

const Stack = createNativeStackNavigator();

export const IndexPost = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="PostHome" component={PostHome} options={{headerShown:false}} />
        <Stack.Screen name="Confirm" component={Confirm} options={{headerShown:false}} />
        <Stack.Screen name="FishList" component={FishList} options={{headerShown:false}}/>
        <Stack.Screen name="Success" component={Success} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}
