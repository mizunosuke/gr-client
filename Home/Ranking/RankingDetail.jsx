import axios from "axios";
import { View, Text, Image, RefreshControl } from "react-native"
import { Avatar, Button } from 'react-native-paper';
import * as React from "react"
import { FlatList } from "react-native";

export const RankingDetail = (props) => {
  // console.log(props.route.params);
  const { fish_id } = props.route.params;

  const [ detailData, setDetailData ] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);

  //データの再取得
  const onRefresh = async() => {
    setRefreshing(true);
    await fetchRankingData();
    setRefreshing(false);
  }


  //fish_idからランキングテーブルの情報を持ってくる
  const fetchRankingData = async() => {
      const rankingData = await axios.get(`https://1eaa-2404-7a87-660-1800-82d-69db-832c-4527.jp.ngrok.io/api/rankings/${fish_id}`);
      // console.log(rankingData.data);
      setDetailData(rankingData.data);
  }

  React.useEffect(() => {
   fetchRankingData();
  },[])

  //ランキングカード用コンポーネント
  const RenderItem = (item) => {
    console.log(item);

    return(
    <View style={{
      width: "98%",
      height: 400,
      borderWidth: 4,
      borderColor: "white",
      marginVertical: 15,
      marginLeft: 2,
      flexDirection: "column",
      borderRadius: 14,
      backgroundColor: "#e0ffff",
    }}>
      <View style={{
        width: "100%",
        height: "60%",
        borderBottomWidth: 2,
        borderColor: "white",
      }}>
        <Image source={{uri: item.attachment}} style={{
          width: "100%",
          height: 235,
          borderRadius: 14
        }}/>
      </View>

      <View style={{
        height: "20%",
        width: "100%",
        flexDirection: "row"
      }}>
        <Text style={{
          width: "20%",
          fontSize: 25,
          fontWeight: "bold",
          paddingVertical: 20,
          paddingLeft:20
        }}>1位</Text>
        <Avatar.Image size={60} source={{uri: item.user_icon}}  style={{
              marginTop: 8,
              width: "15%"
            }}/>
        <View style={{
          flexDirection: "column",
          width: "65%",
          marginLeft: 25
        }}>
          <Text style={{
          fontSize: 20,
          paddingTop: 7,
          fontWeight: "bold",
        }}>{item.user_name}</Text>

          <Text style={{
          fontSize: 25,
          paddingTop: 7,
          fontWeight: "bold",
        }}>記録：{item.size}cm</Text>
        </View>  
      </View>
      <View style={{
        height: "20%",
        width: "100%",
        flexDirection: "column"
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingLeft: 10,
          paddingTop:10
        }}>釣行日：{item.day_of_fishing}</Text>
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingLeft: 10,
          paddingTop:10
        }}>投稿日：{item.created_at}</Text>
      </View>
    </View>
    )
  };

  //とってきたranking_tableのranking_idを持つpostをpost_tableから持ってくる
  //post_tableが持つuser_idを元にアイコンや名前を表示する
  return (
    <View style={{
      backgroundColor:"#08073D",
      flex: 1
    }}>
      <FlatList
        data={detailData}
        renderItem={({item}) => <RenderItem attachment={item.attachment} day_of_fishing={item.day_of_fishing} size={item.size} user_name={item.user_name} user_icon={item.user_icon} created_at={item.created_at}/>}
        keyExtractor={(item) => item.post_id.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      />
    </View>
  )
}

const styles = {
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    height: 200,
    width: "100%",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
};