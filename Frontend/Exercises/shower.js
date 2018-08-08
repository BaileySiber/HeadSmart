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
      <View style={{backgroundColor:"#00a3cc", alignItems:'center', height: '100%'}}>
        <Text style={{fontSize: 25, textAlign: 'center', margin: "5%", marginTop: "10%", color: "white"}}>
          Changes your body temperature can help to distract from certain emotions </Text>

      <Text style={{fontSize: 18, textAlign: 'center', marginTop: "5%", marginLeft:'10%', marginRight:'10%', color: "white"}}>
          If you’re angry, take a cold shower or splash cold water on your face. Anxious or sad? Take a warm shower or bath to relax
          </Text>

        <Animatable.Image
          animation="pulse" duration={2000} iterationCount="infinite"
          source={require('./shower.png')}
          style={{width: "25%", height: "25%", marginBottom: "5%"}}
          />

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
