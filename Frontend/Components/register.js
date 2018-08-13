import React from 'react';
import url from './url';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage } from 'react-native';
  import { LinearGradient } from 'expo';

  export default class RegisterScreen extends React.Component {
    constructor(){
      super();
      this.state={
        username: "",
        password: "",
        name: "",
        email: "",
        phoneNumber: "",
        userid: ''
      }
    }


    register(){
      Alert.alert(
        "Register",
        "Register button pressed!",
        [{ text: "yay" }] // Button
      );
    }

    onPress() {
      let queryUrl = url + '/register';
      return fetch(queryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
        })
      })
      .then(response => response.json())
      .then(json => {
            this.setState({
              userid: json._id
            })
            this.props.navigation.navigate('Survey', {userInfo: this.state});
          })
      .catch(err => console.log('error:' + err))
    }

    render() {
      return (

          <LinearGradient style={{display: 'flex', flex: 1}} colors={["#CAE2D0", "#CAE2D0"]} >

            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
              <Text style={styles.textBig}>Register</Text>
            </View>


            <View style={{alignItems: "center", flex: 3}}>
              <TextInput
                style={styles.textInp}
                placeholder=" Name"
                onChangeText={text => this.setState({ name: text })}
              />
              <TextInput
                style={styles.textInp}
                placeholder=" Email"
                onChangeText={text => this.setState({ email: text })}
              />
              <TextInput
                style={styles.textInp}
                placeholder=" Phone Number"
                onChangeText={text => this.setState({ phoneNumber: text })}
              />
              <TextInput
                style={styles.textInp}
                placeholder=" Username"
                onChangeText={text => this.setState({ username: text })}
              />
              <TextInput
                style={styles.textInp}
                placeholder=" Password"
                onChangeText={text => this.setState({ password: text })}
              />
            </View>


            <View style={{alignItems: 'center', flex: 1}}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.onPress.bind(this)}
                >
                  <Text style={styles.buttonLabel}>Register</Text>
                </TouchableOpacity>
              </View>


            </LinearGradient>

        );
      }
    }

    const styles = StyleSheet.create({
      textBig: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        color: "#79877c",
        fontFamily: 'Georgia'
      },
      button: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 3,
        width: 200
      },
      buttonLabel: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Georgia',
        color: "#79877c"
      },
      textInp: {
        margin: 10,
        width: 200,
        height: 40,
        backgroundColor: "white",
        borderColor: "white",
        borderWidth: 3,
      }
    });
