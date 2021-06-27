import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import EmailScreen from './screens/RegisterScreens/EmailScreen';
import PasswordScreen from './screens/RegisterScreens/PasswordScreen';
import PictureScreen from './screens/RegisterScreens/PictureScreen';
const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED' },
  headerTitleStyle: { color: "white" },
  headerTintColor: 'white',
  ...Platform.select({
    ios: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    },
    android: {
      cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
    },
  }),
}
export default function App() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'black'
    }}>
      <NavigationContainer>
        <Stack.Navigator transitionerStyle={{ backgroundColor: 'black' }} screenOptions={globalScreenOptions}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='AddChat' component={AddChat} />
          <Stack.Screen name='Chat' component={ChatScreen} />
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
          <Stack.Screen name='EmailScreen' component={EmailScreen} />
          <Stack.Screen name='PasswordScreen' component={PasswordScreen} />
          <Stack.Screen name='PictureScreen' component={PictureScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
