import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PostHome } from "./PostHome";
import { FishList } from "./FishList"

const Stack = createNativeStackNavigator();

export const IndexPost = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="PostHome" component={PostHome}  options={{headerShown:false}} />
        <Stack.Screen name="FishList" component={FishList} />
    </Stack.Navigator>
  )
}
