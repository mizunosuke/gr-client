import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SectionList } from 'react-native';

const fishList = [
    {
      title: 'あ',
      data: ['アジ', 'アマダイ', 'アユ', 'アンコウ', 'イサキ', 'イシダイ'],
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
    const [selectedFish, setSelectedFish] = useState(null);
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => setSelectedFish(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  
    const renderSectionHeader = ({ section: { title } }) => (
      <View style={{ backgroundColor: '#eee', padding: 5 }}>
        <Text>{title}</Text>
      </View>
    );
  
    return (
      <View style={{
        flex: 1
      }}>
        <SectionList
          sections={fishList}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
        {selectedFish && (
          <Text>選択された魚種: {selectedFish}</Text>
        )}
      </View>
    );
  }