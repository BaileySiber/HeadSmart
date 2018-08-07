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
 } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default BubbleScreen extends React.Component{
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
      </View>
    )
  }
}
