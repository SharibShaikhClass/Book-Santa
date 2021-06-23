import React from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from "react-native";

//Importing The Firebase 
import db from '../config'
import firebase from "firebase";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();

    //Creating Empty String For The EmailID and Password
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      mobileNo: "",
      address: "",
      confirmPassword: "",
      isModalVisible: false,
    };
  }


  //Login Function
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("DonateBooks");
      })
      .catch((error) => {
        var errorcode = error.code;
        var errormessage = error.message;
        return Alert.alert(errormessage);
      });
  };

  //Registration Function
  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("Passwords Do Not Match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          return Alert.alert("Sucessfully Registered");
        })
        .catch((error) => {
          var errorcode = error.code;
          var errormessage = error.message;
          return Alert.alert(errormessage);
        });
    }
  };

  //Creating The "showmodal" Function"
  showmodal = () => {
    return (

      //Modal Properties And Styling
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>

          {/*Creating The ScrollView For The Modal */}

          <ScrollView style={{ width: "100%" }}>

            {/*Creating A Keyboard Avoding View For Entering The Text Inputs On The Modal */}

            <KeyboardAvoidingView style={styles.keyboardview}>

              {/*Header For The Modal*/}
              <Text style={styles.modalTitle}>Registration</Text>

              {/*Text Input For Writing The "First Name" In The Modal */}
              <TextInput
                style={styles.modaltextinput}
                placeholder="First Name"
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />
              {/*Text Input For Writing The "Last Name" In The Modal */}

              <TextInput
                style={styles.modaltextinput}
                placeholder="Last Name"
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />

              {/*Text Input For Writing The "Contact No." In The Modal */}

              <TextInput
                style={styles.modaltextinput}
                placeholder="Contact No."
                maxLength={10}
                keyboardType="numeric"
                onChangeText={(text) => {
                  this.setState({
                    mobileNo: text,
                  });
                }}
              />

              {/*Text Input For Writing The "Address" In The Modal */}

              <TextInput
                style={styles.modaltextinput}
                placeholder="Address"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />

              {/*Text Input For Writing The "Email ID" In The Modal */}

              <TextInput
                style={styles.modaltextinput}
                placeholder="Email ID"
                keyboardType="email-address"
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />

              {/*Text Input For Writing The "Password" In The Modal */}
              <TextInput
                style={styles.modaltextinput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />

              {/*Text Input For Writing The "Confirm Password" In The Modal */}
              <TextInput
                style={styles.modaltextinput}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
            </KeyboardAvoidingView>

            {/*Creating The Register Button For The Modal */}
            <TouchableOpacity
              style={styles.ModalRegisterbutton}
              onPress={() => {
                this.userSignUp(
                  this.state.emailId,
                  this.state.password,
                  this.state.confirmPassword
                );
                this.setState({ isModalVisible: false });
              }}
            >
              <Text style={styles.ModalRegisterbuttonText}>Register</Text>
            </TouchableOpacity>

            {/*Creating The Cancel Button For The Modal */}
            <TouchableOpacity
              style={styles.ModalRegisterbutton}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
            >
              <Text style={styles.ModalRegisterbuttonText}>Cancel</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showmodal()}
        </View>

        {/* Title Image For The App */}
        <Image
          source={require("../assets/Image.png")}
          style={{ width: 200, height: 200, marginBottom: 40 }}
        />
        {/*Title For The App */}
        <View>
          <Text style={styles.title}> Book Santa </Text>
        </View>

        {/*Creating The Text Input For Entering The "Email ID" for Login */}
        <TextInput
          style={styles.loginBox}
          placeholder="Enter Your Email ID"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              emailId: text,
            });
          }}
        />

        {/*Creating The Text Input For Entering The "Password" for Login */}
        <TextInput
          style={styles.loginBox}
          placeholder="Enter Your Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />

        {/*Creating The "Login" Button For Logging The User */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.userLogin(this.state.emailId, this.state.password);
          }}
        >
          <Text style={styles.submittext}>Login</Text>
        </TouchableOpacity>

        {/*Creating The "SignUp" Button For Logging The User */}
        <Text style={{ marginTop: 20, color: "black", fontSize: 20 }}>Don't Have An Account</Text>

        <TouchableOpacity
          style={styles.SignUpButton}
          onPress={() => {
            this.setState({ isModalVisible: true });
          }}
        >
          <Text style={styles.submittext}>SignUp</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//Creating Styles For The App

const styles = StyleSheet.create({

  //Styling For The Welcome Screen
  
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  //Styling For The Email And Password TextInput Box On The "Welcome Screen"

  loginBox: {
    width: 200,
    height: 20,
    borderBottomWidth: 1.5,
    borderColor: "#ff5722",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    marginBottom: 20
  },

  //Styling For The "Login Button" On The "Welcome Screen"

  loginButton: {
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff5722",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
  },

  //Styling For The "Sign Up" Button On The "Welcome Screen"

  SignUpButton: {
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: -2,
  },

  //Styling For The "Login And SignUp Button" Text
  submittext: {
    fontSize: 22,
    color: "white",
  },

  //Styling For The Title Of The App
  title: {
    fontSize: 55,
    fontWeight: "100",
    paddingBottom: 30,
    color: "#ff3d00",
  },

  //Styling For The Modal

  //Styling For The Title Of The Modal
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },

  //Styling For the Modal Container
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 60,
    borderWidth: 1,
    borderRadius: 20,
  },

  //Styling For The Keyboard Avoiding View
  keyboardview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  //Styling For The Text Inputs In The Modal
  modaltextinput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },

  //Styling For The Register Button In The Modal
  registerbutton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },

  //Styling For The "Register Button Text" In The Modal
  registerbuttontext: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },

  //Styling For The "Cancel Button" In The Modal
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  //Styling For The "Cancel Button Text" In The Modal
  cancelbuttontext: {
    color: "#ff5722",
    fontSize: 15,
  },

  //Styling For The "Register And Cancel Button" In The Modal
  ModalRegisterbutton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
  },

  //Styling For The "Register And Cancel Button Text" In The Modal
  ModalRegisterbuttonText: {
    color: "#ffff",
    fontWeight: "200",
    fontSize: 20,
  }
});
