import axios from "axios"
import * as React from "react"
import { View, Text, Image } from "react-native"

export const IndexMypage = () => {

    //user情報の状態管理
    const [ authUser, setAuthuser ] = React.useState();

    //ログイン中のユーザー情報を取得する
    const fetchAuthUserData = async() => {
        const userData = await axios.get("https://9cfe-2404-7a87-660-1800-9f0-7d13-2a05-31db.jp.ngrok.io/api/user", {
            id: 1
        });
        setAuthuser(userData);
        console.log(userData);
    }
    
    React.useEffect(() => {
        fetchAuthUserData();
    }, [])

    return (
        <View style={{
            flex:1,
            backgroundColor:"#08073D"
        }}>
            <View style={{
                flexDirection: "row",
                height:200,
                borderBottomWidth:2,
                borderBottomColor: "#c0c0c0",
            }}>
                <View style={{
                    flex:1,
                    marginHorizontal: 30,
                    marginVertical: 30
                }}>
                    <Image source={require('../assets/favicon.png')} style={{
                        height:70,
                        width:70,
                        borderRadius: 15
                    }}/>
                </View>

                <View style={{
                    flex:1
                }}>
                    <Text style={{
                        flex:1,
                        fontSize:28,
                        textAlign:"justify",
                        paddingTop:10,
                        color: "white"
                    }}>Piko太郎</Text>

                    <Text style={{
                        flex:1,
                        fontSize:18,
                        textAlign:"justify",
                        color: "white"
                    }}>地域：広島県</Text>

                    <Text style={{
                        flex:1,
                        fontSize:18,
                        textAlign:"justify",
                        color: "white"
                    }}>投稿件数：３件</Text>
                </View>
            </View>
        </View>
    
    )
}