import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import { Button } from 'react-native-paper';

const fishList = [
    {
      title: 'あ',
      data: ['アイゴ', 'アイナメ', 'アオダイ', 'アオチビキ', 'アオハタ', 'アオブダイ','アカアマダイ', 'アカイサキ', 'アカエイ', 'アカカマス', 'アカササノハベラ', 'アカタチ','アカトラギス', 'アカムツ', 'アカハタ', 'アカマツカサ', 'アカメ', 'アカヤガラ','アコウダイ', 'アナハゼ', 'アブラハヤ', 'アマゴ', 'アメマス', 'アヤメカサゴ','アユ', 'アラ', 'アンコウ', 'イカナゴ', 'イサキ', 'イシガキダイ','イシガレイ', 'イシダイ', 'イスズミ', 'イトウ', 'イトフエフキ', 'イトヨリダイ'],
    },
    {
      title: 'か',
      data: ['カサゴ', 'カツオ', 'カレイ', 'カンパチ', 'キス', 'キンメダイ'],
    },
    {
      title: 'さ',
      data: ['カサゴ', 'カツオ', 'カレイ', 'カンパチ', 'キス', 'キンメダイ'],
    },
    {
      title: 'た',
      data: ['カサゴ', 'カツオ', 'カレイ', 'カンパチ', 'キス', 'キンメダイ'],
    },
    {
      title: 'な',
      data: ['カサゴ', 'カツオ', 'カレイ', 'カンパチ', 'キス', 'キンメダイ'],
    },
    {
      title: 'は',
      data: ['カサゴ', 'カツオ', 'カレイ', 'カンパチ', 'キス', 'キンメダイ'],
    },
    {
      title: 'ま',
      data: ['カサゴ', 'カツオ', 'カレイ', 'カンパチ', 'キス', 'キンメダイ'],
    },

    // 省略
  ];

  
  //魚種選択用コンポーネント
export const FishList = () => {
    const navigation = useNavigation();
    const [selectedFish, setSelectedFish] = useState(null);
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => setSelectedFish(item)}>
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingVertical: 3
        }}>{item}</Text>
      </TouchableOpacity>
    );
  
    const renderSectionHeader = ({ section: { title } }) => (
      <View style={{ backgroundColor: '#d3d3d3', padding: 5 }}>
        <Text style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingVertical: 3,
        }}>{title}</Text>
      </View>
    );

    //魚種をPostHomeに渡す
    const handleDecide = () => {
      navigation.navigate("PostHome",{
        kind: selectedFish
      });
    }
  
    return (
      <View style={{
        flex: 1,
        paddingBottom: 60 // スペースを追加
      }}>
        <SectionList
          sections={fishList}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
        {selectedFish && (
          <View style={{
            padding: 10,
            margin: 10,
            borderWidth: 1,
            borderColor: '#ccc'
          }}>
            <Text style={{
              fontSize: 20
            }}>選択中の魚種 : {selectedFish}</Text>
          </View>
        )}
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 10,
          backgroundColor: '#f8f8f8'
        }}>
          <Button onPress={handleDecide}>決定</Button>
        </View>
      </View>
      
    );
  }