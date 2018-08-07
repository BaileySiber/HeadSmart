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
      userid: '5b68c69eed8b8ee77f55167d',
    }

  }
  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    // this.setState({
    //   userid: userInfo.userid
    // });

    fetch(url + '/' + this.state.userid + '/showLog')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        journalBody: json.journalBody,
        emotionColor: json.emotionColor,
        reasons: json.reasons,
        newDetailedEmotions: json.newDetailedEmotions,
        oldDetailedEmotions: json.oldDetailedEmotions.
        completedSuggestion: json.completedSuggestion,
        creationTime: json.creationTime
      })
    })
    .catch(err => console.log('error getting most recent log' + err))
  }


  render(){
    return (

      <LinearGradient style={{height:"100%"}} colors={["#b3e0ff", "#00a3cc"]} >


            <View>
              <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", fontSize: 40}}>Your Log</Text>
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
