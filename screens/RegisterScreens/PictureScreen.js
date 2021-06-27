import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Button, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../firebase';

export default function PasswordScreen({route, navigation}) {
    const data = route.params;
    const [imageUrl, setImageUrl] = useState('');
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

    const register = () => {
        auth.createUserWithEmailAndPassword(data.email, data.password).then(authUser => {
            authUser.user.updateProfile({
                displayName: data.name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        }).catch(error => alert(error.message));
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={styles.container}>
            <StatusBar style="light" />
            <Text h4 style={{ fontWeight: 'bold', color: "white" }}>Profile Picture URL (optional)</Text>
            <View style={styles.inputContainer}>
                <TextInput returnKeyType="done" style={styles.input} autoFocus type="text" value={imageUrl} onChangeText={text => setImageUrl(text)} onSubmitEditing={register} />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={register}>
                <View style={{width: width - 40, alignItems: "center",padding: 10, borderRadius:5,marginVertical: 5 , backgroundColor: '#6300FF'}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Register</Text>
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
