import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../firebase';
export default function CustomListItem({ id, chatName, enterChat }) {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setChatMessages(snapshot.docs.map((doc) => doc.data()))
        ))

        return unsubscribe;
    }, [])
    const RenderStatus = () => {
        if (chatMessages?.length > 0) {
            return chatMessages?.[0]?.displayName + " : " + chatMessages?.[0]?.message
        } else {
            return "There are no messages here yet."
        }
    }
    return (
        <ListItem containerStyle={styles.listitem} key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar rounded source={{ uri: chatMessages?.[0]?.photoURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }} />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold", color: 'white' }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{color: 'white'}}>
                    <RenderStatus />
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="#6300FF" />
        </ListItem>
    )
}

const styles = StyleSheet.create({
    listitem: {
        backgroundColor: 'black'
    }
})
