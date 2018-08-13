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

  // import Amplify, { Auth } from 'aws-amplify';
  // import AWSConfig from '../AWS/aws-exports'
  // Amplify.configure(AWSConfig)

  export default class RegisterScreen extends React.Component {
    constructor(){
      super();
      this.state={
        username: "",
        password: "",
        name: "",
        email: "",
        phone_number: "",
        userid: '',
        // confirmationCode: ''
      }
    }


    // signUp() {
    //   Auth.signUp({
    //     username: this.state.username,
    //     password: this.state.password,
    //     attributes: {
    //       email: this.state.email,
    //       phone_number: this.state.phone_number,
    //       name: this.state.name
    //     }
    //   })
    //   .then(() => console.log('successful signup!'))
    //   .catch(err => console.log('error signing up!' + JSON.stringify(err)))
    // }
    //
    // confirmSignUp() {
    //   Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
    //   .then(() => console.log('successful confirmation!'))
    //   .catch(err => console.log('error confirming sign up!' + err))
    // }


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


          <View style={{alignItems: "center", flex: 7}}>
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
              onChangeText={text => this.setState({ phone_number: text })}
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

            <TouchableOpacity
              style={styles.button}
              onPress={this.onPress.bind(this)}
              >
                <Text style={styles.buttonLabel}>Register</Text>
              </TouchableOpacity>

              {/* <TextInput
                style={styles.textInp}
                placeholder=" Confirmation Code"
                onChangeText={text => this.setState({ confirmationCode: text })}
              /> */}

              {/* <View style={{alignItems: 'center', flex: 1}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.confirmSignUp.bind(this)}
                  >
                    <Text style={styles.buttonLabel}>Confirm</Text>
                  </TouchableOpacity>
                </View> */}

              </View>


            </LinearGradient>

          );
        }
      }

      const styles = StyleSheet.create({
        textBig: {
          fontSize: 35,
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
          fontSize: 20,
          fontFamily: 'Georgia',
          color: "#79877c"
        },
        textInp: {
          margin: 5,
          width: 200,
          height: 40,
          backgroundColor: "white",
          borderColor: "white",
          borderWidth: 3,
        }
      });
