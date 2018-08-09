import React from 'react';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
 } from 'react-native';
import * as Animatable from 'react-native-animatable';


export default class MusicScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      userid: "",
      name: ""
    };
  }

  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      name: userInfo.name
    })
  }


  toreEvaluate(){
    let userInfo = {
      userid: this.state.userid,
      name: this.state.name
    }
    this.props.navigation.navigate('Reevaluate', {userInfo: userInfo});
  }

  play = async () => {
    const soundObject = new Expo.Audio.Sound();

    try {
      await soundObject.loadAsync(require('.././assets/weightless.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
      Alert.alert(
        'Music is playing!',
        "Turn off silent mode or put on your earbuds",
        [
          { text: 'Ready to Relax' }
        ]
      )
    } catch (error) {
      // An error occurred!
      console.log('error playing music:', error)
    }
  }


  render(){
    return (
      <View style={{backgroundColor:"#00a3cc", alignItems:'center', height: '100%'}}>
        <Text style={{fontSize: 22, textAlign: 'center', margin: "5%", marginTop: "10%", color: "white"}}>
          Listen to this music and relax!
        </Text>


          <Animatable.Image
            animation="pulse" duration={2000} iterationCount="infinite"
            source={require('./music.png')}
            style={{width: "30%", height: "30%", marginBottom: "5%"}}
            onPress={this.music}
            />

            <View style={{alignItems:'center'}}>
              <TouchableOpacity onPress={this.play} style={styles.doneButton}>
                <Text style={{fontSize: 30, color: "white", fontFamily:"Cochin"}}>Play</Text>
              </TouchableOpacity>
            </View>

          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.toreEvaluate()} style={styles.doneButton}>
              <Text style={{fontSize: 30, color: "white", fontFamily:"Cochin"}}>Done</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  doneButton: {
    borderColor: 'white',
    width: 100,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
