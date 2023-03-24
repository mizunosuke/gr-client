import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { IndexHome } from '../Home/IndexHome';
import { IndexMeasure } from '../Measure/IndexMeasure';
import { IndexMypage } from '../Mypage/IndexMypage';
import { IndexPost } from '../Post/IndexPost';
import { IndexSetting } from '../Setting/IndexSetting';

const Tab = createBottomTabNavigator();

export const Bottombar = () => {
    return (
    <NavigationContainer>
      <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={() => ({
        tabBarActiveTintColor: "#00008b"
      })}
      >
        <Tab.Screen
        name="Home"
        component={IndexHome}
        options={{
          title:"ホーム",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          )
        }}
        />
        
        <Tab.Screen
        name="Mypage"
        component={IndexMypage}
        options={{
          title:"マイページ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }}
        />
        <Tab.Screen
        name="Post"
        component={IndexPost}
        options={{
          title:"投稿",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          )
        }}
        />
        <Tab.Screen
        name="Measure"
        component={IndexMeasure}
        options={{
          title:"計測",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-circle" size={size} color={color} />
          )
        }}
        />
        <Tab.Screen
        name="Setting"
        component={IndexSetting}
        options={{
          title:"設定",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    )
}