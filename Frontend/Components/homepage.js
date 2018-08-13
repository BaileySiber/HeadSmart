import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage
} from "react-native"
import { LinearGradient } from "expo";

export default class HomePage extends React.Component{
  constructor(){
    super();
    this.state={
      name: '',
      username: '',
      userid: ''
    }
  }
  toNew(){
    this.props.navigation.navigate("Mood", {userInfo: this.state});
  }
  toOld(){
    this.props.navigation.navigate("OldLogs", {userInfo: this.state});
  }
  toStats(){
    this.props.navigation.navigate("Stats", {userInfo: this.state});
  }

  componentDidMount() {
    let userInfo = this.props.navigation.getParam('userInfo');
    let queryUrl = url + '/' + userInfo.userid ;
    return fetch(queryUrl)
    .then(response=> response.json())
    .then(json => {
      this.setState({
        name: json.name,
        username: json.username,
        userid: userInfo.userid
      });
    })

  }

  render(){
    return(
      <View>
        <LinearGradient style={{height:"100%"}} colors={["#CAE2D0", "#CAE2D0"]} >
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontFamily:"Georgia", color:"#79877c", fontSize:60, marginTop: 30, marginBottom: 20}}>Home</Text>
          </View>
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center", margin: 20}} onPress={() => this.toNew()}>
              <Image style={{height:50, width: 40}} source={require('./new.png')}/>
              <Text style={{fontFamily:"Georgia", color:"#79877c", fontSize:30}}>
              New Log
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center", margin: 20}} onPress={() => this.toOld()}>
              <Image style={{height:40, width: 50}} source={require('./old.png')}/>
              <Text style={{fontFamily:"Georgia", color:"#79877c", fontSize:30}}>
              Old Logs
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center", margin: 20}} onPress={() => this.toStats()}>
              <Image style={{height:50, width: 40}} source={require('./stats.png')}/>
              <Text style={{fontFamily:"Georgia", color:"#79877c", fontSize:30}}>
              Statistics
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}
