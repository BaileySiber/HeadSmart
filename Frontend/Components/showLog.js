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
import moment from "moment";

export default class Journal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      journalBody: '',
      emotionColor: 0,
      reasons: [],
      creationTime: '',
      newDetailedEmotions: [],
      oldDetailedEmotions: [],
      completedSuggestion: '',
      userid: ''
    }
  }


  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');

    var dateString = userInfo.log.creationTime.toString();
    console.log(dateString)

    this.setState({
          journalBody: userInfo.log.journalBody,
          emotionColor: userInfo.log.emotionColor,
          reasons: userInfo.log.reasons,
          newDetailedEmotions: userInfo.log.newDetailedEmotions,
          oldDetailedEmotions: userInfo.log.oldDetailedEmotions,
          completedSuggestion: userInfo.log.completedSuggestion,
          creationTime: moment(userInfo.log.creationTime).format("dddd, MMMM Do YYYY, h:mm:ss a"),
          userid: userInfo.userid
        })
    };

toHome() {
  let userInfo = {
    userid: this.state.userid,
  }
  this.props.navigation.navigate('HomePage', {userInfo: userInfo});
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

        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={() => this.toHome()} style={styles.doneButton}>
            <Text style={{fontSize: 20, color: "white", fontFamily:"Cochin"}}>Done</Text>
          </TouchableOpacity>
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
  },
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
