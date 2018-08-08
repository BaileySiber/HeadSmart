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

export default class DrinkScreen extends React.Component{
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
          Drinking and holding something warm, like a cup of tea, can help to reduce sadness and anxiety </Text>

      <Text style={{fontSize: 18, textAlign: 'center', marginTop: "5%", marginLeft:'10%', marginRight:'10%', color: "white"}}>
          Make tea, hot milk, or hot cocoa to sip! </Text>
          
        <Animatable.Image
          animation="pulse" duration={2000} iterationCount="infinite"
          source={{uri: 'http://clipartstation.com/wp-content/uploads/2017/11/hot-coffee-clipart-black-and-white.png'}}
          style={{width: "25%", height: "25%"}}
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
