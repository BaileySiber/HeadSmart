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
      journal: "",
      userid: '',
      value: '',
      emotions: [],
      reasons: [],
      wantJournal: false,
      suggestions: {}
    }

  }
  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      value: userInfo.value,
      reasons: userInfo.reasons,
      emotions: userInfo.emotions
    });
  }

  skipSection(){

    const queryUrl = url + '/' + this.state.userid + '/newLog';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: this.state.userid,
        value: this.state.value,
        emotions: this.state.emotions,
        reasons: this.state.reasons,
        journalBody: this.state.journal
      })
    })
    .then(result => result.json())
    .then(jsonResult => {
      if(jsonResult){

        if(jsonResult === "you are happy you donut need our help!"){

          fetch(url + '/' + this.state.userid + '/showLastLog')
          .then(resp => resp.json())
          .then(json => {
            let userInfo = {
              log: json,
              userid: this.state.userid
            }

            Alert.alert(
              'Journal saved',
              "Seems like you are having a good day overall, so we will skip suggestions!",
              [
                { text: 'OK', onPress: () =>  this.props.navigation.navigate('ShowLog', {userInfo: userInfo})}
              ]
            )
          })
          .catch(err => console.log('error sending happy log' + err))
        }

        else {
          this.setState({
            suggestions: jsonResult
          })
          Alert.alert(
            'Journal skipped',
            "Let's get to suggestions!",
            [
              { text: 'OK', onPress: () =>  this.props.navigation.navigate('Suggestions', {userInfo: userInfo})}
            ]
          )
          let userInfo = {
            userid: this.state.userid,
            suggestions: this.state.suggestions
          }
          this.props.navigation.navigate('Suggestions', {userInfo: userInfo});
        }
      }
    })
  }

  yesJournal(){
    this.setState({
      wantJournal: true
    })
  }

  postJournal(){
    const queryUrl = url + '/' + this.state.userid + '/newLog';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: this.state.userid,
        value: this.state.value,
        emotions: this.state.emotions,
        reasons: this.state.reasons,
        journalBody: this.state.journal
      })
    })
    .then(result => result.json())
    .then(jsonResult => {
      if(jsonResult){
        if(jsonResult === "you are happy you donut need our help!"){

          fetch(url + '/' + this.state.userid + '/showLastLog')
          .then(resp => resp.json())
          .then(json => {
            let userInfo = {
              log: json,
              userid: this.state.userid
            }

            Alert.alert(
              'Journal saved',
              "Seems like you are having a good day overall, so we will skip suggestions!",
              [
                { text: 'OK', onPress: () =>  this.props.navigation.navigate('ShowLog', {userInfo: userInfo})}
              ]
            )
          })
          .catch(err => console.log('error sending happy log' + err))
        }

        else {
          this.setState({
            suggestions: jsonResult
          })
          let userInfo = {
            userid: this.state.userid,
            suggestions: this.state.suggestions
          }
          Alert.alert(
            'Journal saved',
            "Let's get to suggestions!",
            [
              { text: 'OK', onPress: () =>  this.props.navigation.navigate('Suggestions', {userInfo: userInfo})}
            ]
          )
        }
      }

    })
    .catch(err => console.log('error saving post' + err))
  }


  render(){
    return (

      <LinearGradient style={{height:"100%"}} colors={["#CAE2D0", "#CAE2D0"]} >

        {this.state.wantJournal ?

          <View>
            <View>
              <Text style={{textAlign: 'center', color:"#505a53", fontFamily: "Georgia", fontSize: 40}}>Daily Journal</Text>
            </View>

            <TouchableOpacity>
              <Text style={{fontFamily: "Georgia", marginTop: "10%", color: "#505a53", fontSize: 20, textAlign: 'center'}} onPress={()=> this.postJournal()}>
                Save </Text>
            </TouchableOpacity>

            <View style={{alignItems:"center", justifyContent:"center"}}>
              <TextInput
                style={{
                  margin: 10,
                  width: '80%',
                  height: '80%',
                  borderColor: "white",
                  backgroundColor: '#e9f3ec',
                  borderWidth: 2
                }}
                multiline = {true}
                placeholder="Write your journal here"
                onChangeText={text => {
                  this.setState({ journal: text })}
                }
              />
            </View>

          </View>

          :

          <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>

            <Text style={{textAlign: 'center', color:"#505a53", fontFamily: "Georgia", fontSize: 40, paddingTop: "5%"}}>Do you want to make a journal entry?</Text>
            <View style={{alignItems: 'center', paddingTop: "10%"}}>

              <View style={{marginBottom: "5%"}}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.skipSection()}>
                  <Text style={{fontSize: 30, textAlign: 'center', color:"#505a53", fontFamily:"Georgia"}}>Skip</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.yesJournal()}>
                <Text style={{fontSize: 30, textAlign: 'center', color:"#505a53", fontFamily:"Georgia"}}>Journal</Text>
              </TouchableOpacity>
            </View>

          </View>
        }

      </LinearGradient>

    );
  }
}



const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: '#e9f3ec',
    backgroundColor: '#e9f3ec',
    width: 120,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
