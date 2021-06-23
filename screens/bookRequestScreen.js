import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      reasonToRequest: "",
      userId: firebase.auth().currentUser.email,
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (bookName, reasonToRequest) => {
    var userId = this.state.userId;
    var requestId = this.createUniqueId();
    db.collection("book_requests").add({
      user_id: userId,
      book_name: bookName,
      reason_to_request: reasonToRequest,
      request_id: requestId,
    });

    this.setState({
      bookName: "",
      reasonToRequest: "",
    });

    return Alert.alert("Book Request Submitted Successfully");
  };

  render() {
    return (
      
      <View style={styles.container}>
       
       <MyHeader title="Request Books" />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formtextinput}
            placeholder="Name Of The Book"
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
            value={this.state.bookName}
          />

          <TextInput
            style={styles.formtextinput}
            placeholder="Reason For The Request"
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => {
              this.setState({
                reasonToRequest: text,
              });
            }}
            value={this.state.reasonToRequest}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonToRequest);
            }}
          >
            <Text style={styles.requesttext}>Request Book</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formtextinput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ff5722",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    alignSelf:"center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#ff5722",

  },
  requesttext: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  keyBoardStyle:{
    flex:0.8,
    justifyContent:'center',
    
  }
});
