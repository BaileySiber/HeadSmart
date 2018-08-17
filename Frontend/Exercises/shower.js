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

export default class ShowerScreen extends React.Component{
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
      <View style={{backgroundColor:"#CAE2D0", alignItems:'center', height: '100%'}}>
        <Text style={{fontFamily:'Georgia', fontSize: 25, textAlign: 'center', margin: "5%", marginTop: "10%", color: "#505a53"}}>
          Changing your body temperature can help to distract from certain emotions </Text>

      <Text style={{fontFamily:'Georgia', fontSize: 18, textAlign: 'center', marginTop: "3%", marginLeft:'10%', marginRight:'10%', color: "#505a53"}}>
          If you’re angry, take a cold shower or splash cold water on your face. Anxious or sad? Take a warm shower or bath to relax
          </Text>

        <Animatable.Image
          animation="pulse" duration={2000} iterationCount="infinite"
          source={require('./shower.png')}
          style={{width: "25%", height: "25%", marginTop:"3%", marginBottom: "3%"}}
          />

          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.toreEvaluate()} style={styles.button}>
                <Text style={styles.buttonLabel}>Done</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 3,
    width: 150
  },
  buttonLabel: {
    fontFamily:"Cochin",
    color:"#505a53",
    textAlign: 'center',
    fontSize: 30
  }
})
