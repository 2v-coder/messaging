import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, View, Dimensions, NetInfo, Platform, TextInput } from 'react-native'
import { Input, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';
import InternetChecker from "../components/InternetChecker"
import { TouchableOpacity } from 'react-native';
const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { width, height } = Dimensions.get('window');
    const [title, setTitle] = useState('Sign In');
    const isConnected = InternetChecker.isNetworkAvailable().then((data) => {
        setTitle('Sign In');
    }).catch((data) => {
        setTitle('No Internet Connection');
    })

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home');
            }
        })
        return unsubcribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
            headerTitleAlign: Platform.OS === "ios" ? 'center' : 'left',
            headerLeft: null,
            headerStyle: {backgroundColor: "#6300FF"}
        })

    }, [navigation])

    return (
        <>
        
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.inputContainer}>
                    <Text h4 style={{ fontWeight: 'bold', color: "white" }}>Email</Text>
                    <TextInput selectionColor={"#6300FF"} style={styles.input} autoFocus type="email" value={email} onChangeText={text => setEmail(text)} />
                    <Text h4 style={{ fontWeight: 'bold', color: "white" }}>Password</Text>
                    
                    <TextInput selectionColor={"#6300FF"} returnKeyType="done" style={styles.input} type="password" secureTextEntry value={password} onSubmitEditing={signIn} onChangeText={text => setPassword(text)} />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={signIn}>
                <View style={{width: width - 20, alignItems: "center",padding: 10, borderRadius:5,marginVertical: 5 , backgroundColor: '#6300FF'}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Login</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>
                <View style={{width: width - 20, alignItems: "center" , padding: 10, borderRadius:5,marginVertical: 5 , backgroundColor: 'transparent', borderColor: "#6300FF", borderWidth: 0.5}}>
                    <Text style={{fontSize: 16, color: '#6300FF'}}>Register</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'black',
    },
    inputContainer: {
        width: "100%"
    },
    button: {
        width: "100%",
        marginTop: 10,
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
