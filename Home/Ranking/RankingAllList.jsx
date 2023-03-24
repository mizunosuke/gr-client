import { useNavigation } from "@react-navigation/native"
import { View, StyleSheet, Image } from "react-native"
import { TopMenu } from "../../components/TopMenu";
import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import axios from "axios";
import { FlatList } from "react-native";



export const RankingAllList = () => {

  //DBから取ってきたデータを配列で管理
  const [ allRanking, setAllRanking ] = React.useState([]);
  

  //DBから全ランキングを取ってくる
  const fetchAllRanking = () => {
    axios.get("https://9cfe-2404-7a87-660-1800-9f0-7d13-2a05-31db.jp.ngrok.io/api/rankings")
    .then((res) => {
      // console.log(res.data);
      setAllRanking(res.data);
      
    })
    .catch((e) => {
      console.log(e);
    }) 
  }

  //タイトル左のアイコン
  const LeftContent = props => <Avatar.Icon {...props} icon="crown" />

  //画面遷移
  const navigation = useNavigation();

  //ランキングカード用コンポーネント
  const RankingCard = (item) => {
    // const [ posts, setPosts ] = React.useState([]);
    
    // console.log(item);
    //ランキングidを元にPostテーブルからデータを3件sizeの降順で取得する
    // const fetchPosts = (fishId) => {
    //   axios.get("https://9cfe-2404-7a87-660-1800-9f0-7d13-2a05-31db.jp.ngrok.io/api/fish/posts",{
    //     id: fishId
    //   })
    //   .then((res) => {
    //     // console.log(res.data);
    //     setPosts(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // } 

    // console.log(posts);

    // //postデータをfetch
    // React.useEffect(() => {
    //   fetchPosts(item.fish_id);
    // }, []);

    return ( 
    <Card style={{
      marginVertical: 10
    }}>
      <Card.Title title={`${item.fish_name}のランキング`} left={LeftContent} titleStyle={{fontSize: 24, paddingTop: 5}}/>
      <View style={{
        flexDirection: "row",
      }}>
        {item.posts.map((post) => (
          <View style={{
            flex: 1,
            alignItems: "center"
          }}>
            <Image source={{ uri: post.attachment }} style={{
              width: "95%",
              height:100,
            }} />
            <Text>記録：{post.size}</Text>
            <Text>釣行日：{post.day_of_fishing}</Text>
          </View>
        ))}
      </View>
      <Card.Actions>
        <Text>{item.start}</Text>
        <Button onPress={() => {navigation.navigate('RankingDetail', {
          fish_id:item.fish_id,
        })}}>詳細を見る</Button>
      </Card.Actions>
    </Card>
    )
  }
  //-------ここまで

  //初回マウント時にデータフェッチ
  React.useEffect(() => {
    fetchAllRanking();
  }, [])


  return (
    <View style={styles.container}>
      <TopMenu/>
      <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={allRanking}
      renderItem={({item}) => <RankingCard start={item.start} end={item.end} num={item.num_of_participant} fish_id={item.fish_id} fish_name={item.fish_name} ranking_id={item.id} posts={item.posts}/>}
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