import axios from "axios";
import { View, Text, Image } from "react-native"
import * as React from "react"
import { FlatList } from "react-native";

export const RankingDetail = (props) => {
  // console.log(props.route.params);
  const { fish_id } = props.route.params;

  const [ detailData, setDetailData ] = React.useState();


  //fish_idからランキングテーブルの情報を持ってくる
  const fetchRankingData = async() => {
      const rankingData = await axios.get(`https://9cfe-2404-7a87-660-1800-9f0-7d13-2a05-31db.jp.ngrok.io/api/rankings/${fish_id}`);
      console.log(rankingData.data);
      setDetailData(rankingData.data);
  }

  React.useEffect(() => {
   fetchRankingData();
  },[])

  //ランキングカード用コンポーネント
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.attachment }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Size: {item.size}</Text>
        <Text style={styles.cardSubTitle}>Day of Fishing: {item.day_of_fishing}</Text>
        <Text style={styles.cardSubTitle}>User Name: {item.user_name}</Text>
      </View>
    </View>
  );

  //とってきたranking_tableのranking_idを持つpostをpost_tableから持ってくる
  //post_tableが持つuser_idを元にアイコンや名前を表示する
  return (
    <View style={{
      backgroundColor:"#08073D",
      flex: 1
    }}>
      <FlatList
        data={detailData}
        renderItem={renderItem}
        keyExtractor={(item) => item.post_id.toString()}
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