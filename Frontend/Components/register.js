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

    lowercase() {
      var regex = /^(?=.*[a-z]).+$/;
      if(regex.test(this.state.password)){
        console.log('lowercase true')
        return true;
      }
      console.log('lowercase false')
    }

    uppercase() {
      var regex = /^(?=.*[A-Z]).+$/;
      if(regex.test(this.state.password)){
        console.log('uppercase true')
        return true;
      }
      console.log('uppercase false')
    }

    special() {
      var regex = /^(?=.*[0-9_\W]).+$/;
      if(regex.test(this.state.password)){
        console.log('special true')
        return true;
      }
      console.log('special false')
    }

    onPress() {
      if(!this.state.username || !this.state.password || !this.state.name){
        Alert.alert(
          'Oops!',
          "Seems like you forgot to complete all fields!",
          [
            { text: 'OK'}
          ]
        )
      }
      else if (this.state.password.length < 6 || !this.lowercase() || !this.uppercase() || !this.special()) {
        Alert.alert(
          'Oops!',
          "Please make sure your password meets requirements!",
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

              <View style={{alignItems: 'center', marginTop: "5%"}}>
                <Text style={styles.textSmall}>Password requirements:</Text>
                <Text style={styles.textSmall}> - 6 or more characters</Text>
                <Text style={styles.textSmall}> - at least one uppercase letter</Text>
                <Text style={styles.textSmall}> - at least one number or symbol</Text>
              </View>

            </View>

          </LinearGradient>

        );
      }
    }

    const styles = StyleSheet.create({
      textSmall: {
        fontSize: 15,
        textAlign: 'center',
        margin: 3,
        color: "#79877c",
        fontFamily: 'Georgia'
      },
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
