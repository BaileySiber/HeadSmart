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
        <LinearGradient style={{height:"100%"}} colors={["#CAE2D0", "#CAE2D0"]} >

          <View style={{alignItems: "center", marginTop: "10%"}}>

            <Text style={{fontFamily:"Georgia", color:"black", fontSize: 45}}>Home</Text>

            <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", margin: "5%"}}>
              <View>
                <TouchableOpacity style={{borderRadius: 6, backgroundColor: "#e9f3ec", alignItems: "center", justifyContent:"center", margin: "5%"}} onPress={() => this.toNew()}>
                  <Image style={{marginTop: "14%", height:50, width: 40}} source={require('./new.png')}/>
                  <Text style={{marginBottom: "14%", fontFamily:"Georgia", color:"gray", fontSize: 20}}>
                    New Log
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{borderRadius: 6, backgroundColor: "#e9f3ec", alignItems:"center", justifyContent:"center", margin: "5%"}} onPress={() => this.toOld()}>
                  <Image style={{marginTop: "14%", height:40, width: 50, marginBottom: "10%"}} source={require('./old.png')}/>
                  <Text style={{marginBottom: "14%", fontFamily:"Georgia", color:"gray", fontSize:20}}>
                    Old Logs
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>>
              <View>
                <TouchableOpacity style={{borderRadius: 6, backgroundColor: "#e9f3ec", alignItems:"center", justifyContent:"center", margin: "5%"}} onPress={() => this.toStats()}>
                  <Image style={{marginTop: "14%", height:50, width: 40}} source={require('./stats.png')}/>
                  <Text style={{marginBottom: "14%", fontFamily:"Georgia", color:"gray", fontSize:20}}>
                    Statistics
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{borderRadius: 6, backgroundColor: "#e9f3ec", alignItems:"center", justifyContent:"center", margin: "5%"}} onPress={() => this.toFriends()}>
                  <Image style={{marginTop: "15%", marginRight: "5%", marginLeft: "5%", height:50, width: 50}} source={require('./friends.png')}/>
                  <Text style={{marginBottom: "15%", fontFamily:"Georgia", color:"gray", fontSize:20}}>
                    Friends
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

              <Image style={{height:"30%", width: "70%"}} source={require('./welcome.png')}/>

          </View>



        </LinearGradient>
      </View>
    )
  }
}
