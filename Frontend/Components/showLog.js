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

export default class Journal extends React.Component{
  constructor(props){
    super(props);

    this.state= {
      userid: '',
    }

  }
  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    console.log('userid is -----------' + userInfo.userid)
    this.setState({
      userid: userInfo.userid
    });

    console.log(url+'/'+ userInfo.userid + '/showLog')

    fetch(url + '/' + userInfo.userid + '/showLog')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        journalBody: json.journalBody,
        emotionColor: json.emotionColor,
        reasons: json.reasons,
        newDetailedEmotions: json.newDetailedEmotions,
        oldDetailedEmotions: json.oldDetailedEmotions,
        completedSuggestion: json.completedSuggestion,
        creationTime: json.creationTime
      })
      console.log("reasons is ----------" + this.state.reasons)
    })
    .catch(err => console.log('error getting most recent log' + err))
  }




  render(){

    return (

      <LinearGradient style={{height:"100%"}} colors={["#00a3cc", "#00a3cc"]} >


        <View>
          <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", margin:"5%", fontSize: 30}}>Your Log from: {this.state.creationTime}</Text>
        </View>

        <View>
          <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", margin:"5%", fontSize: 20}}>Overall mood: {this.state.emotionColor}</Text>
        </View>

        <View>
          <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", margin:"5%", fontSize: 20}}>Reasons: {this.state.reasons} </Text>
        </View>

        <View>
          <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", margin:"5%", fontSize: 20}}>Journal: {this.state.journalBody}</Text>
        </View>

        <View>
          <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", margin:"5%", fontSize: 20}}>Suggestion: {this.state.completedSuggestion}</Text>
        </View>


      </LinearGradient>

    );
  }
}



const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: 'white',
    width: 120,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
