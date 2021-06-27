import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

export default function EmailScreen({route, navigation}) {
    const data = route.params;
    const [email, setEmail] = useState('');
    const {width, height} = Dimensions.get('window');
    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle: 'Back',
            headerTitle: "Create Account",
            headerStyle: { backgroundColor: '#6300FF' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white'
        })
    }, [navigation])
    const next = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(email && reg.test(email)) {
            navigation.navigate("PasswordScreen", {"name": data.name, "email": email, "password": "", "pictureURL": ""})
        } else {
            alert('This field is invalid');
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
            <StatusBar style="light" />
            <Text h4 style={{ fontWeight: 'bold', color: "white" }}>What's your email?</Text>
            <View style={styles.inputContainer}>
                <TextInput returnKeyType="next" style={styles.input} autoFocus type="email" value={email} onSubmitEditing={next} onChangeText={text => setEmail(text)} />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={next}>
                <View style={{width: width - 40, alignItems: "center",padding: 10, borderRadius:5,marginVertical: 5 , backgroundColor: '#6300FF'}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Next</Text>
                </View>
            </TouchableOpacity>           
        </KeyboardAvoidingView>
    )
}

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
