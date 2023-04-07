import axios from "axios"
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cameraimage from "../assets/camera.png";
import { useNavigation } from "@react-navigation/native";

const LeftContent = props => <Avatar.Icon {...props} icon="fish" />

export const MypageHome = (props) => {
    console.log(props.route.params);

    const navigation = useNavigation();

    const [ user, setUser ] = useState(null);
    const [ postData, setPostData ] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);


    //投稿データを取りにいく
    const fetchPostData = async(id) => {
        res = await axios.get(`https://1eaa-2404-7a87-660-1800-82d-69db-832c-4527.jp.ngrok.io/api/posts/user/${id}`);
        // console.log(res.data);
        setPostData(res.data.postdata);
        return res.data.postdata;
    }

    //トークンを削除する関数
    const handleLogout = async () => {
        try {
        await AsyncStorage.removeItem('@token');
        setUser(null); // ログアウト状態にする
        } catch (e) {
        console.log('Failed to remove token');
        }
    };

    //マイページ編集
    const handleEdit = () => {
        navigation.navigate("EditMypage", {user: user});
    }

    const getToken = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@token')
            const parseValue = JSON.parse(jsonValue);
            const postData = await fetchPostData(parseValue.user.id);
            setPostData(postData);
            // console.log(postData);
            // console.log(parseValue);
            return parseValue;
            
            } catch (e) {
            console.log(e);
            return null;
            }
        };

    const onRefresh = () => {
        setIsRefreshing(true);
        fetchPostData(user.user.id);
        if(props.route.params) {
            setUser(props.route.params);
        }
        setIsRefreshing(false);
    };
    
    useEffect(() => {   
        const fetchToken = async () => {
        const token = await getToken();
        setUser(token);
        };
        fetchToken();
    }, []);

    

    return (
        <>
        {user !== null ? (
            <View style={styles.container}>
                <View style={styles.userInfo}>
                <Avatar.Image
                size={100}
                source={ user.user.icon_path !== null ? {uri:user.user.icon_path} : {uri: "../assets/camera.png"}}
                />
                <Text style={styles.userName}>{user.user.name}</Text>
                </View>
                <Button mode="contained" icon="account-edit" style={styles.button} onPress={handleEdit}>
                マイページ編集
                </Button>
                <Button mode="contained" icon="logout" style={styles.button} onPress={handleLogout}>
                ログアウト
                </Button>
                <ScrollView refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
                {postData ? postData.map((post) => {
                console.log(post);
                
                return(
                <View style={{
                    flexDirection: "column",
                    borderWidth: 2,
                    borderColor: "white",
                    height: 300,
                    marginVertical: 10,
                    shadowColor: "#fff",
                    shadowOffset: {
                        width: 2,
                        height: 1,
                    },
                    shadowOpacity: 0.78,
                    shadowRadius: 8.00,

                    elevation: 24,
                }}>
                    <View style={{
                        height: "25%",
                        borderWidth: 2,
                        borderColor: "gray",
                        flexDirection: "row"
                    }}>
                        <Avatar.Image size={48} source={require('../assets/camera.png')} style={{
                            marginTop: 8,
                            marginLeft: 15,
                            marginRight:15
                        }}/>
                        <Text style={{
                            color: "white",
                            fontSize: 24,
                            paddingTop:18,
                            fontWeight: "bold"
                        }}>{post.fishname}</Text>
                        <View style={{
                            flexDirection: "column",
                            marginLeft: 20
                        }}>
                            <Text style={{
                                color: "white",
                                fontSize: 15,
                                paddingTop:10,
                                fontWeight: "bold"
                            }}>釣行日：{post.day_of_fishing}</Text>
                            <Text style={{
                            color: "white",
                            fontSize: 15,
                            paddingTop:10,
                            fontWeight: "bold"
                            }}>投稿日：{post.craeted_at}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        height: "75%"
                    }}>
                        <View style={{
                            width: "33%",
                        }}>
                            <View style={{
                                flexDirection: "column",
                                height: "100%"
                            }}>
                                <Text style={{
                                color: "white",
                                fontSize: 20,
                                paddingTop: 25,
                                paddingLeft: 9,
                                fontWeight: "bold"
                                }}>サイズ</Text>
                                <Text style={{
                                color: "white",
                                fontSize: 24,
                                paddingTop: 5,
                                paddingLeft: 9,
                                fontWeight: "bold"
                                }}>{post.size} cm</Text>
                                <Text style={{
                                color: "white",
                                fontSize: 20,
                                paddingTop: 25,
                                paddingLeft: 9,
                                fontWeight: "bold"
                                }}>順位 </Text>
                                <Text style={{
                                color: "white",
                                fontSize: 20,
                                paddingTop: 5,
                                paddingLeft: 9,
                                fontWeight: "bold"
                                }}>{post.ranking}位 / </Text>
                            </View>
                        </View>
                        <View style={{
                            width: "67%",
                        }}>
                            <Image source={{
                                uri: post.attachment
                            }} style={{
                                alignItems: "center",
                                width:"100%",
                                height:220
                            }}/>
                        </View>
                    </View>
                </View>
                )}) : (
                    null
                )}
                </ScrollView>
            </View>
        ) : (
            null
        )} 
        </>       
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
      backgroundColor: "#08073D"
    },
    userInfo: {
      alignItems: 'center',
      marginBottom: 26,
    },
    userName: {
      fontSize: 28,
      fontWeight: "bold",
      marginTop: 16,
      color: "white"
    },
    button: {
      marginVertical: 8,
      backgroundColor: "#7f1184"
    },
    card: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
      },
  });