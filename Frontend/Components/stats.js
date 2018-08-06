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

export default class StatsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      mostProductiveActivity:'',
      totalLogs: 0,
      topEmotions: [],
      topReasons: [],
      mostUsedSuggestion:''
    }
  }

  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    fetch(url + '/' + userInfo.userid + '/stats')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        mostProductiveActivity,
        totalLogs,
        topEmotions,
        topReasons,
        mostUsedSuggestion
      })
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
          <LinearGradient style={{height:"100%"}} colors={["#7fd64d", "#4dd6ba"]} >

          <View style={{flex:1, backgroundColor: this.state.emo_color, }}>
          <Text style={{color: 'white', fontSize: 'large'}}>Your Top 5 emotions:</Text>
          <View style={{justifyContent: "space-evenly"}}>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topEmotions[0]}</Text>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topEmotions[1]}</Text>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topEmotions[2]}</Text>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topEmotions[3]}</Text>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topEmotions[4]}</Text>
          </View>
          </View>

          <View style={{flex:1}}>
          <Text style={{color: "#658BF3", fontSize: 'large'}}>We think these aspects of your life affect your emotions the most:</Text>
          <View style={{justifyContent: "space-evenly"}}>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topReasons[0]}</Text>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topReasons[1]}</Text>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.topReasons[2]}</Text>
          </View>
          </View>

          <View style={{flex:1, justifyContent: "space-evenly"}}>
          <Text style={{color: 'white', fontSize: 'medium'}}>{this.state.mostProductiveActivity} helped you the most!</Text>
          <Text style={{color: 'white', fontSize: 'medium'}}>You did {this.state.mostUsedSuggestion} most often!</Text>
          </View>

          <View style={{flex:1, justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 'medium'}}>You have logged {this.state.totalLogs} times!</Text>
          </View>


          </LinearGradient>
          </View>

    )
  }
}
