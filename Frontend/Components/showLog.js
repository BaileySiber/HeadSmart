import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  ScrollView,
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

      <LinearGradient style={{display:'flex', flex:1, height:"100%"}} colors={["#CAE2D0", "#CAE2D0"]} >


        <View>
          <Text style={{textAlign: 'center', color:"#79877c", fontFamily: "Georgia", margin:"5%", fontSize: 25}}>{this.state.creationTime}</Text>
        </View>

        <View style={{flex:1}}>
          <Text style={{textAlign: 'center', color:"#79877c", fontFamily: "Georgia", margin:"5%", fontSize: 20}}>Overall mood: {this.state.emotionColor}</Text>
        </View>


        {this.state.reasons ?
          <View style={{flex:1}}>
            <Text style={{textAlign: 'center', color:"#79877c", fontFamily: "Georgia", margin:"5%", fontSize: 20}}>Reasons: {this.state.reasons} </Text>
          </View>
          : null }

          {this.state.journalBody ?
            <View style={{flex:1}}>
              <View>
                <Text style={{textAlign: 'center', color:"#79877c", fontFamily: "Georgia", fontSize: 20}}>Journal:</Text>
              </View>
              <View style={{paddingTop:"3%", marginLeft:"10%", marginRight:"10%", backgroundColor: '#e9f3ec', borderRadius:10}}>
                <Text style={{backgroundColor: '#e9f3ec', textAlign: 'center', color:"#79877c", fontFamily: "Georgia", fontSize: 15}}>{this.state.journalBody}</Text>
              </View>
            </View>
            : null}

            {this.state.completedSuggestion ?
              <View style={{flex:1}}>
                <Text style={{textAlign: 'center', color:"#79877c", fontFamily: "Georgia", margin:"5%", fontSize: 20}}>Suggestion: {this.state.completedSuggestion}</Text>
              </View>
              : null}

              <View style={{flex: 1, alignItems:'center'}}>
                <TouchableOpacity onPress={() => this.toHome()} style={styles.doneButton}>
                  <Text style={styles.buttonLabel}>Done</Text>
                </TouchableOpacity>
              </View>

            </LinearGradient>

          );
        }
      }



      const styles = StyleSheet.create({
        buttonLabel: {
          fontFamily:"Cochin",
          color:"#79877c",
          textAlign: 'center',
          fontSize: 20
        },
        doneButton: {
          alignItems: 'center',
          padding: 10,
          margin: 5,
          borderColor: "white",
          borderRadius: 5,
          borderWidth: 3,
          width: 150
        }
      })
