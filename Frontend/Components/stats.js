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
        mostProductiveActivity: json.mostProductiveActivity,
        totalLogs: json.totalLogs,
        topEmotions: json.topEmotions,
        topReasons: json.topReasons,
        mostUsedSuggestion: json.mostUsedSuggestion
      })
    })
    .catch(err => console.log(err))
  }

  render(){
    return(

      <LinearGradient style={{height:"100%"}} colors={["#CAE2D0", "#CAE2D0"]} >

        <Text style={{marginTop: "5%", color: '#505a53', fontSize: 25, textAlign: 'center'}}>Your Top 5 emotions are:</Text>
        <Text style={styles.emo}>{this.state.topEmotions[0]}</Text>
        <Text style={styles.emo}>{this.state.topEmotions[1]}</Text>
        <Text style={styles.emo}>{this.state.topEmotions[2]}</Text>
        <Text style={styles.emo}>{this.state.topEmotions[3]}</Text>
        <Text style={styles.emo}>{this.state.topEmotions[4]}</Text>

        <Text style={{marginTop: "5%", color: "#505a53", fontSize: 25, textAlign: 'center'}}>What affects you the most:</Text>
        <Text style={styles.emo}>{this.state.topReasons[0]}</Text>
        <Text style={styles.emo}>{this.state.topReasons[1]}</Text>
        <Text style={styles.emo}>{this.state.topReasons[2]}</Text>


        <Text style={{marginTop: "5%", color: '#505a53', fontSize: 25, textAlign:'center', marginLeft: "5%", marginRight:"5%"}}>{this.state.mostProductiveActivity} helps you the most!</Text>
        <Text style={{marginTop: "5%", color: '#505a53', fontSize: 25, textAlign:'center', marginLeft: "5%", marginRight:"5%"}}>You do {this.state.mostUsedSuggestion} most often!</Text>

        <Text style={{marginTop: "10%", color: '#505a53', fontSize: 20, textAlign:'center'}}>You have logged {this.state.totalLogs} times!</Text>

      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  emo: {
    color: '#505a53',
    textAlign: 'center',
    fontSize: 20
  }
})
