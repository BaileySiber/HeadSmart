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
        userid: '',
      }
    }


    onPress() {
      if(!this.state.username || !this.state.password || !this.state.name){
        console.log('in sheeeet')
        Alert.alert(
          'Oops!',
          "Seems like you forgot to complete all fields!",
          [
            { text: 'OK'}
          ]
        )
      }
      else {
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
          })
        })
        .then(response => response.json())
        .then(json => {
          if(json === {"error":"username is already taken!"}){
            Alert.alert(
              'Oops!',
              "Username is already taken!",
              [
                { text: 'OK'}
              ]
            )
          }
          else {
            this.setState({
              userid: json
            })
            this.props.navigation.navigate('Survey', {userInfo: this.state});
          }
        })
        .catch(err => {
          Alert.alert(
            'Oops!',
            "Username is already taken!",
            [
              { text: 'OK'}
            ]
          )
        })
      }
    }

    render() {
      return (

        <LinearGradient style={{display: 'flex', flex: 1}} colors={["#CAE2D0", "#CAE2D0"]} >

          <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
            <Text style={styles.textBig}>Register</Text>
          </View>


          <View style={{alignItems: "center", flex: 5, marginTop: "10%"}}>
            <TextInput
              style={styles.textInp}
              placeholder=" Name"
              onChangeText={text => this.setState({ name: text })}
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
