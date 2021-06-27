import React, {useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { auth, db } from '../firebase'
import {Platform, TouchableOpacity, Dimensions} from 'react-native';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

export default function ProfileScreen({navigation}) {
    const {width, height} = Dimensions.get('window')
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Profile Screen",
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            headerTitleAlign: Platform.OS === "ios" ? 'center' : 'left',
            headerTitle: () => (
                <>
                <Text style={{fontSize: 19, fontWeight: '500', color: 'white'}}>Profile</Text>
                </>
            ),
        })

    }, [navigation])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }
    return (
        <View style={styles.container}>
                <Text style={{fontSize: 19, marginVertical: 15, color: 'white'}}>Logged in as: {auth?.currentUser?.displayName}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={signOutUser}>
                    <View style={{width: width - 20, alignItems: "center",padding: 10, borderRadius:5,marginVertical: 5 , backgroundColor: '#6300FF'}}>
                        <Text style={{fontSize: 16, color: 'white'}}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: 'black'
    }
})
