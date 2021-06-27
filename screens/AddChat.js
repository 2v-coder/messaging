import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';
export default function AddChat({ navigation }) {
    const [input, setInput] = useState("");
    const {width, height} = Dimensions.get('window')
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerStyle: {backgroundColor: "#6300FF"},
            headerBackTitle: 'Chats'
        })
    }, [navigation])
    const createChat = async () => {
        if(input) {
            await db.collection('chats').add({
                chatName: input
            }).then(() => {
                navigation.goBack();
            }).catch((error) => alert(error))
        } else {
            alert("This field is required")
        }
        
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput selectionColor={"#6300FF"} placeholder="Enter a chat name" returnKeyType="done" style={styles.input} autoFocus type="text" value={input} onSubmitEditing={createChat} onChangeText={text => setInput(text)} />
            </View>
            
            <TouchableOpacity activeOpacity={0.8} onPress={createChat}>
                <View style={{width: width - 60, alignItems: "center",padding: 10, borderRadius:5,marginVertical: 5 , backgroundColor: '#6300FF'}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Create new Chat</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 30,
        height: '100%'
    },
    input: {
        color: 'white',
        backgroundColor: "#b3b3b3",
        marginVertical: 5,
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
        paddingLeft: 15,
        fontSize: 15 
    }
})
