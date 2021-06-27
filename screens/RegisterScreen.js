import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, Button, TextInput } from 'react-native'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native-elements';
const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("")
    const {width, height} = Dimensions.get('window')
    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle: 'Back to Login',
            headerTitle: "Create Account",
            headerStyle: { backgroundColor: '#6300FF' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
        })
    }, [navigation])

    
    const next = () => {
        if(name) {
            navigation.navigate("EmailScreen", {"name": name, "email": "", "password": "", "pictureURL": ""})
        } else {
            alert("This field is required")
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
            <StatusBar style="light" />
            <Text h4 style={{ fontWeight: 'bold', color: "white" }}>What's your full name?</Text>
            <View style={styles.inputContainer}>
                <TextInput returnKeyType="next" style={styles.input} autoFocus type="text" value={name} onChangeText={text => setName(text)} onSubmitEditing={next}/>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={next}>
                <View style={{width: width - 40, alignItems: "center",padding: 10, borderRadius:5,marginVertical: 5 , backgroundColor: '#6300FF'}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Next</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black'
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor: '#6300FF'
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
