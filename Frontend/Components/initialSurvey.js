import React from 'react';
import url from './url';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage,
 } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { LinearGradient } from 'expo';
import Swipeout from 'react-native-swipeout'
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)});
export default class SurveyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionName: '',
      suggestionDescription: '',
      userInfo: this.props.navigation.getParam('userInfo'),  //this.props = this.props.navigation.getParam
      suggestionsArr: ds.cloneWithRows([]),
      openAdd: false,
      emotions: [],
      selectedIndex: 0,
      buttons: ['anger', 'sadness', 'anxiety', 'guilt', 'shame']
    }
    let userid = this.state.userInfo.userid;
    fetch(url + '/' + userid + '/showSuggestions')
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        suggestionsArr: ds.cloneWithRows(json)
      })
    })
  }


//finish removeSuggestion and addSuggestion

  removeSuggestion(suggest) {
    //update state, splice out this suggestion
    let userid = this.state.userInfo.userid;
    fetch(url + '/' + userid + '/deleteSuggestion', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        suggestion: suggest.name,
      })
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        suggestionsArr: ds.cloneWithRows(json.suggestions)
      })
      Alert.alert(
         'This suggestion has been delted!'
      )
    })
    .catch(err => console.log(err))
  }

  registerFinal() {
    this.props.navigation.navigate('HomePage', {userInfo: this.state.userInfo});
    //fetch post a new user
    //with userInfo from state, and suggestions arr
  }

  addSuggestion() {
    let userid = this.state.userInfo.userid
    let queryUrl = url + '/' + userid + '/addSuggestion';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.suggestionName,
        description: this.state.suggestionDescription,
        tags: this.state.emotions
      })
    }).then(response => response.json())
    .then(json => {
      if (json.status === 200){
        this.setState({
          suggestionName: '',
          suggestionDescription: '',
          openAdd: false,
          emotions: [],
          suggestionsArr: ds.cloneWithRows(json.suggestions)
        })
        Alert.alert(
           'This suggestion has been Added!'
        )
      }
    })
    .catch(err => console.log(err))
  }

  cancelSuggestion(){
    this.setState({
      openAdd: false
    })
  }

  showAddSuggestion() {
    this.setState({
      openAdd: true
    })
  }

  updateIndex (selectedIndex) {
    this.setState({
      selectedIndex,
      emotions: [...this.state.emotions, this.state.buttons[selectedIndex]]
    })
  }

  render() {
    let emotionTags = this.state.emotions.slice()
    console.log("emotionTags are", emotionTags)
    emotionTags = emotionTags.join(' ')
    return (
      <Swiper showsButton={false} loop={false}>
        <Intro />
        <View>
          <LinearGradient style={{height:"100%"}} colors={["#b3e0ff", "#00a3cc"]} >
              <Text style={styles.welcomeText}>{this.state.userInfo.name}</Text>
               <ListView
                 dataSource={this.state.suggestionsArr}
                 renderRow={(suggest) => {
                   let swipeBtns = [{
                      text: 'Delete',
                      backgroundColor: 'red',
                      onPress: () => { this.removeSuggestion(suggest) }
                      }];
                   return (
                     <Swipeout right={swipeBtns}
                       autoClose='true'
                       backgroundColor= 'transparent'>
                      <TouchableOpacity
                        style={styles.suggestBox}
                        //add an onSwipe to removeSuggestion
                        >
                        <View style={styles.suggestBox}><Text>{suggest.name}</Text></View>
                        <View><Text>{suggest.description}</Text></View>
                    </TouchableOpacity>
                </Swipeout>
              )}}
              />
                <View style={{paddingBottom: 20, alignItems: 'center',
                justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.showAddSuggestion.bind(this)} style={styles.button}>
                  <Text style={styles.buttonText}>Add a suggestion</Text>
                </TouchableOpacity>
                {
                  this.state.openAdd ?
                  <View style={styles.suggestBox}>
                    <TextInput placeholder="Title" style={styles.textInp} value={this.state.suggestionName} onChangeText={(text) => this.setState({suggestionName: text})} />
                    <TextInput placeholder="Description" style={styles.textInp} value={this.state.suggestionDescription} onChangeText={(text) => this.setState({suggestionDescription: text})} />
                    <ButtonGroup
                      onPress={this.updateIndex.bind(this)}
                      selectedIndex={this.state.selectedIndex}
                      buttons={this.state.buttons}
                      containerStyle={{height: 50}}
                    />
                    <TextInput placeholder="Emotion Tags" style={styles.textInp} value={emotionTags} onChangeText={(text) => this.setState({emotions: text})} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={this.addSuggestion.bind(this)} style={styles.addButton}>
                      <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.cancelSuggestion.bind(this)} style={styles.cancelButton}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                : null}

                <TouchableOpacity onPress={this.registerFinal.bind(this)} style={styles.button}>
                  <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
          </LinearGradient>
        </View>
      </Swiper>
    );
  }
}

class Intro extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient style={{height:"100%"}} colors={["#b3e0ff", "#00a3cc"]} >
          <Animatable.Text animation="fadeOutUp" delay="1500" style={styles.welcomeText}>
              Welcome To Head Smart!
          </Animatable.Text>
          <Animatable.Text animation="fadeInUp" delay="1700" style={styles.welcomeText}>
              This app will offer you suggestions/exercises to improve your mood in the moment
          </Animatable.Text>
          <Animatable.Text animation="fadeInUp" delay="3500" style={styles.welcomeText}>
              We have some already and add/delete as you wish!
          </Animatable.Text>
        </LinearGradient>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestBox: {
    justifyContent: 'center',
    backgroundColor: '#e6ffff',
    alignItems: 'center',
    borderRadius: 10
  },
  textInp: {
    margin: 10,
    width: 280,
    height: 30,
    borderColor: "#8aa5ad",
    borderWidth: 1.5,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'white',
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
    //marginBottom: 10
  },
  buttonText : {
    fontSize: 20,
    fontFamily: 'Cochin',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    fontSize: 17,
    fontFamily: 'Cochin',
    textAlign: 'center',
    alignItems: "center",
    justifyContent: 'center',
    // paddingBottom: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
    margin: 8,
    height: 35,
    width: 80
  },
  cancelButton: {
    fontSize: 17,
    fontFamily: 'Cochin',
    textAlign: 'center',
    alignItems: "center",
    justifyContent: 'center',
    // paddingBottom: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5,
    margin: 8,
    height: 35,
    width: 80,
    alignSelf: "flex-end"
  },
  welcomeText:{
    fontSize: 32,
    fontFamily: 'Georgia',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    margin: 10
  }
})
