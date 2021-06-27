import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, useEffect } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { TextInput } from "react-native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { db, auth } from "../firebase";
import * as firebase from "firebase";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { event } from "react-native-reanimated";
export default function ChatScreen({ navigation, route }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollView = useRef();
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();
  const MessageRenderer = () => {
    return messages.map(({ id, data }) => <View></View>);
  };
  const keyboardDidShow = (event) => {
    setKeyboardOffset(event.endCoordinates.height);
  };
  const keyboardDidHide = () => {
    setKeyboardOffset(0);
  };
  React.useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      keyboardDidShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  const sendMessage = () => {
    if (input.length > 0 && input !== " ") {
      Keyboard.dismiss();
      db.collection("chats").doc(route.params.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
      setInput("");
    }
  };
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerStyle: {
        backgroundColor: "black",
        elevation: 0,
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerBackTitle: "Chats",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              fontWeight: "700",
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 25 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        position: "absolute",
        width: "100%",
        height: "100%",
        bottom: keyboardOffset,
      }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <>
            {/* <ScrollView contentContainerStyle={{ paddingTop: 15 }} ref={scrollView} onContentSizeChange={() => {

                            scrollView.current.scrollToEnd({ animated: true })

                        }}>
                            <MessageRenderer />
                        </ScrollView> */}
            {messages.length > 0 ? (
              <FlatList
                ref={scrollView}
                onContentSizeChange={() => {
                  scrollView.current.scrollToOffset({
                    offset: 0,
                    animated: true,
                  });
                }}
                inverted
                data={messages}
                renderItem={({ item }) => {
                  return item.data.email === auth.currentUser.email ? (
                    <View key={item.id} style={styles.reciever}>
                      <Text style={styles.recieverText}>
                        {item.data.message}
                      </Text>
                    </View>
                  ) : (
                    <View key={item.id} style={styles.sender}>
                      <Avatar
                        containerStyle={{
                          position: "absolute",
                          bottom: 5,
                          left: -40,
                        }}
                        position="absolute"
                        bottom={5}
                        left={-40}
                        rounded
                        size={30}
                        source={{
                          uri: item.data.photoURL,
                        }}
                      />
                      <Text style={styles.senderName}>
                        {item.data.displayName}
                      </Text>
                      <Text style={styles.senderText}>{item.data.message}</Text>
                    </View>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>
                  There Are No Messages Here
                </Text>
                <Text style={{ color: "white" }}>
                  Be The First One To Start Conversation
                </Text>
              </View>
            )}

            <View style={styles.footer}>
              <TextInput
                selectionColor={"#6300FF"}
                value={input}
                onChangeText={(text) => {
                  setInput(text);
                }}
                placeholder="Type Message..."
                style={{
                  bottom: 0,
                  height: 40,
                  flex: 1,
                  marginRight: 15,
                  backgroundColor: "#ECECEC",
                  padding: 10,
                  color: "black",
                  borderRadius: 10,
                }}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#6300FF" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    backgroundColor: "black",
  },
  textinput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "black",
    borderRadius: 10,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#6300FF",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    marginLeft: 50,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginTop: 5,
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
  },
  senderName: {
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
});
