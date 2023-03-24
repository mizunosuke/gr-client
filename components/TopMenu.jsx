import * as React from 'react';
import { List } from 'react-native-paper';

export const TopMenu = () => {

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    //全てのランキングを表示する
    const handleShowAll = () => {
        //axiosでデータベースから全てのランキング情報を持ってくる
    }

    //参加中のランキングを表示する
    const handleShowJoin = () => {
        //axiosでログインユーザーが所属するランキングの情報を持ってくる
    }

    return (
        <List.Section style={{
            marginTop: 0,
            marginBottom: 0,
            paddingBottom: 5,
        }}>
            <List.Accordion
                title="表示するランキングを変更する"
                left={props => <List.Icon {...props} icon="crown" />}
                expanded={expanded}
                onPress={handlePress}
                >
                <List.Item 
                title="全ての魚種" 
                onPress={handleShowAll}
                left={props => <List.Icon {...props} icon="fish" />}
                style={{
                    backgroundColor: "white"
                }}
                />
                <List.Item 
                title="参加中の魚種" 
                onPress={handleShowJoin} 
                left={props => <List.Icon {...props} icon="fish" />}
                style={{
                    backgroundColor: "white"
                }}
                />
            </List.Accordion>
        </List.Section>
    )
}