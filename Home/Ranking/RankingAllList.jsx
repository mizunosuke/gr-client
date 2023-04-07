import { useNavigation } from "@react-navigation/native"
import { View, StyleSheet, Image, RefreshControl, TouchableOpacity } from "react-native"
import { TopMenu } from "../../components/TopMenu";
import * as React from 'react';
import { Avatar, Button, Card, shadow, Text } from 'react-native-paper';
import axios from "axios";
import { FlatList } from "react-native";
import defaultImage from "../../assets/camera.png";



export const RankingAllList = () => {

  //DBから取ってきたデータを配列で管理
  const [ allRanking, setAllRanking ] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  

  //DBから全ランキングを取ってくる
  const fetchAllRanking = () => {
    axios.get("https://1eaa-2404-7a87-660-1800-82d-69db-832c-4527.jp.ngrok.io/api/rankings")
    .then((res) => {
      console.log(res.data);
      setAllRanking(res.data);
    })
    .catch((e) => {
      console.log(e);
    }) 
  }

  //データの再取得
  const onRefresh = async() => {
    setRefreshing(true);
    await fetchAllRanking();
    setRefreshing(false);
  }

  //タイトル左のアイコン
  const LeftContent = props => <Avatar.Icon {...props} icon="crown" style={{
    backgroundColor: "#08073D",
    shadowOpacity: 0.7,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 6
    }
  }}/>

  //画面遷移
  const navigation = useNavigation();

  //ランキングカード用コンポーネント
  const RankingCard = (item) => {

    const startDate = item.start;
    const endDate = item.end;
    // Dateオブジェクトを生成
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // 日付の情報を取得
    const startyear = startDateObj.getFullYear(); // 年
    const startmonth = startDateObj.getMonth() + 1; // 月 (0-indexedなので +1)
    const startday = startDateObj.getDate(); // 日

    // 日付の情報を取得
    const endyear = endDateObj.getFullYear(); // 年
    const endmonth = endDateObj.getMonth() + 1; // 月 (0-indexedなので +1)
    const endday = endDateObj.getDate(); // 日

    // 日付単位までのみの表示に整形
    const formattedStartDate = `${startyear}-${startmonth < 10 ? '0' + startmonth : startmonth}-${startday < 10 ? '0' + startday : startday}`;
    const formattedEndDate = `${endyear}-${endmonth < 10 ? '0' + endmonth : endmonth}-${endday < 10 ? '0' + endday : endday}`;



    return ( 
      <View style={{
        flexDirection: "column",
        height: 400,
        width: "96%",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        marginVertical: 15,
        backgroundColor: "#dbffff",
        shadowOffset: {
          width: 3,
          height:5
        },
        shadowColor: "white",
        shadowOpacity:0.68,
        marginLeft:8
      }}>
          <View style={{
            flexDirection: "row",
            height: "20%",
            borderBottomWidth: 2
          }}>
            <Avatar.Image size={60} source={require("../../assets/camera.png")}  style={{
              marginLeft: 25,
              marginTop: 10
            }}/>
            <Text style={{
              paddingLeft: 30,
              paddingTop: 24,
              fontSize: 28,
              fontWeight: "bold",
              width: "40%"
            }}>{item.fish_name}</Text>
            <View style={{
              marginLeft: 35,
              width: "35%"
            }}>
              <Text style={{
              paddingTop: 14,
              fontSize: 18,
              fontWeight: "bold",
            }}>参加中の人数</Text>
              <Text style={{
              paddingTop: 5,
              fontSize: 18,
              fontWeight: "bold"
            }}>{item.num}人</Text>
            </View>
          </View>

          <View style={{
            height: "60%",
            borderBottomWidth: 2,
            flexDirection: "row"
          }}>
            {item.posts.map((post, index) => (
              <View style={{
                flex: 1,
                alignItems: "center",
                width: "100%"
              }}>
                <View style={{
                  flexDirection: "row",
                  width:"100%"
                }}>
                  <Avatar.Image size={28} source={{uri: post.user[0].icon_path}}  style={{
                    marginLeft: 15,
                    marginVertical: 5
                  }}/>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 15,
                    marginTop: 5
                  }}>{index + 1}位</Text>
                </View>
                <Image source={post.attachment ? { uri: post.attachment } : { uri: defaultImage }} style={{
                  width: "95%",
                  height:100,
                }} />
                <Text style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop:5,
                  textDecorationLine: "underline"
                }}>記録：{post.size}cm</Text>
                <Text style={{
                  fontWeight: "bold",
                  paddingTop: 5
                }}>投稿者</Text>
                <Text style={{
                  fontWeight: "bold",
                  paddingTop: 5
                }}>{post.user[0].name}</Text>
              </View>
            ))}
          </View>

          <View style={{
            height: "20%",
            width: "100%"
          }}>
            <View style={{
              flexDirection: "row",
              width: "100%",
              height: "50%"
            }}>
              <Avatar.Image size={28} source={require("../../assets/camera.png")}  style={{
                      marginLeft: 15,
                      marginVertical: 5
              }}/>
              <Text style={{
                fontSize: 17,
                fontWeight: "bold",
                textDecorationLine: "underline",
                textShadowColor: "blue",
                textShadowOffset: {
                  width: 3,
                  height: 5
                },
                textDecorationColor: "#dbedff",
                width: "80%",
                paddingLeft: 15,
                paddingTop: 7
              }}>開催期間：{formattedStartDate} ~ {formattedEndDate}</Text>
            </View>
            <Button onPress={() => {navigation.navigate('RankingDetail', {
              fish_id:item.fish_id,
            })}}
            mode="contained"
            style={{justifyContent: "center", marginHorizontal: 100}}
            >詳細を見る
            </Button>
          </View>
      </View>
    )
  }
  //-------ここまで

  React.useEffect(() => {
    fetchAllRanking();
  }, []);


  
    return (
      <View style={styles.container}>
        <TopMenu/>
        <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={allRanking}
        renderItem={({item}) => <RankingCard start={item.start} end={item.end} num={item.num_of_participant} fish_id={item.fish_id} fish_name={item.fish_name} ranking_id={item.id} posts={item.posts}/>}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        />
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:"#08073D"
  },
  topmenu: {
      height: 50
  }
})