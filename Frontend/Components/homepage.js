import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  Text,
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
  toFriends(){
    this.props.navigation.navigate("Friends", {userInfo: this.state});
  }

  componentDidMount() {
    let userInfo = this.props.navigation.getParam('userInfo');
    let queryUrl = url + '/' + userInfo.userid ;
    return fetch(queryUrl)
    .then(response => response.json())
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
        <LinearGradient style={{height:"100%"}} colors={["#00a3cc", "#00a3cc"]} >
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontFamily:"Georgia", color:"white", fontSize:40, marginTop: 30, marginBottom: 80}}>Home</Text>
          </View>
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center", margin: 20}} onPress={() => this.toNew()}>
              <Text style={{fontFamily:"Georgia", color:"white", fontSize:30}}>
              New Log
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center", margin: 20}} onPress={() => this.toOld()}>
              <Text style={{fontFamily:"Georgia", color:"white", fontSize:30}}>
              Old Logs
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center", margin: 20}} onPress={() => this.toStats()}>
              <Text style={{fontFamily:"Georgia", color:"white", fontSize:30}}>
              Statistics
              </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{alignItems:"center", justifyContent:"center", margin: 20}} onPress={() => this.toFriends()}>
              <Text style={{fontFamily:"Georgia", color:"white", fontSize:30}}>
              Friends
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}
