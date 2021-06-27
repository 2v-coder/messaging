import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase'
import { Platform } from 'react-native';
const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);


    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        return unsubscribe;
    }, [])

    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chats",
            headerStyle: { 
                backgroundColor: 'black', 
                elevation:0, 
                shadowColor: 'transparent', 
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                } 
            },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            headerTitleAlign: Platform.OS === "ios" ? 'center' : 'left',
            headerTitle: () => (
                <>
                <Text style={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>Chats</Text>
                </>
            ),
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginRight: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                    
                        <SimpleLineIcons name="pencil" size={22} color="#6300FF" />
                        
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id, chatName
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    }
})
