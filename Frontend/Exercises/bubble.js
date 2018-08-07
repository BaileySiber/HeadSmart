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

export default class BubbleScreen extends React.Component{
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


  render(){
    return (
      <View style={styles.container}>
        <Animatable.Text animation="fadeIn" duration={5000}
          style={{fontSize: 28, textAlign: 'center', margin: 10, fontColor: "white"}}>
          Heard you had a hard day..</Animatable.Text>
        <Animatable.Text animation="fadeIn" duration={5000}
          style={{fontSize: 18, textAlign: 'center', margin: 10, fontColor: "white"}}>
          Blow it away with a bubble!</Animatable.Text>
        <Animatable.Image
          animation="zoomIn" duration={4250} iterationCount={10} direction="alternate" easing="linear"
          source={{uri: 'http://www.pngmart.com/files/7/Soap-Bubbles-PNG-Image.png'}}
          style={{margin: 10, width: 300, height: 300}}
          />

          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.toreEvaluate()} style={styles.doneButton}>
              <Text style={{fontSize: 40, color: "black", fontFamily:"Cochin"}}>Done</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  doneButton: {
    marginTop: "50%",
    borderColor: 'white',
    width: 200,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
