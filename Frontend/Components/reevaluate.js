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
  AsyncStorage } from 'react-native';
  import { LinearGradient } from 'expo';
  import { Slider } from 'react-native-elements';
  var negativeObj = require('./emotionsObjects').negativeObj;
  var positiveObj = require('./emotionsObjects').positiveObj;


  export default class EmotionsScreen extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        positiveObj: positiveObj,
        negativeObj: negativeObj,
        positiveBool: true,
        effective: false,
        score: 0,
        userid: '5b68c69eed8b8ee77f55167d',
        suggestionName: 'Physical activity'
      }
    }

    componentDidMount() {
      let userInfo = this.props.navigation.getParam('userInfo');            //userinfo = userid and mood value
      // userInfo && this.setState({
      //   userid: userInfo.userid,
      //   suggestionName: userInfo.name
      // });
      Alert.alert(
        'Time to re-evaluate!',
        "Rerank your emotions",
        [
          { text: 'Sounds good' }
        ]
      )
    }

    updateVal(val, emotion) {
      if (this.state.positiveBool) {
        let updated = Object.assign({}, this.state.positiveObj)
        updated[emotion] = val;
        this.setState({
          positiveObj: updated
        })
      }                      //when updating intensity, call this function
      else {
        let updated = Object.assign({}, this.state.negativeObj)
        updated[emotion] = val;
        this.setState({
          negativeObj: updated
        })
      }
    }

    toNegatives() {
      this.setState({
        positiveBool: false
      })
    }

    toEffectiveness() {
      this.setState({
        effective: true
      })
    }

    toFinal(){
      let posArr = Object.keys(this.state.positiveObj).map((emotion) => ({'name': emotion, 'intensity': this.state.positiveObj[emotion]}))
      let negArr = Object.keys(this.state.negativeObj).map((emotion) => ({'name': emotion, 'intensity': this.state.negativeObj[emotion]}))
      let finalArr = posArr.concat(negArr)

      const queryUrl = url + '/' + this.state.userid + '/reEvaluate';
      return fetch(queryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          emotions: finalArr,
          score: this.state.score,
          completedSuggestion: this.state.suggestionName
        })
      })
      .then(result => result.json())
      .then(jsonResult => {
        console.log('jsonresult is --------------' + jsonResult)
        if(jsonResult.status === 200){
          console.log('successfully update!')
        }
      })
      .catch(err => console.log('error in updating' + err))

      this.props.navigation.navigate('SingleLog', {userInfo: userInfo})
    }

    render(){
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      return(

        <View style={{display: 'flex', flex: 1}}>
          {!this.state.effective ?

            <View style={{display: 'flex', flex: 1, backgroundColor: "#00a3cc"}}>

              {this.state.positiveBool ?
                <View style={{alignItems: 'center'}}>
                  <Text style={{color:"white", fontFamily: "Cochin", fontSize: 50}}>Positive</Text>
                </View>
                :
                <View style={{alignItems: 'center'}}>
                  <Text style={{color:"white", fontFamily: "Cochin", fontSize: 50}}>Negative</Text>
                </View>
              }
              


              {this.state.positiveBool ?

                <ListView                                                                       //list of names/intensities
                dataSource={ds.cloneWithRows(Object.keys(this.state.positiveObj))}
                renderRow={rowData => {
                  let n = rowData;
                  return (
                    <View style={styles.sliderBox}>
                      <Text style={{color: 'white', fontSize: 20}}>{n}: {this.state.positiveObj[n]}</Text>
                      <Slider
                        style={{width: "80%"}}
                        value={this.state.positiveObj[n]}
                        onSlidingComplete={(val) => {this.updateVal(val, n)}}
                        step={1}
                        minimumValue={0}
                        maximumValue={10}
                        thumbTintColor={"white"}
                        minimumTrackTintColor={"white"}
                        maximumTrackTintColor={"white"}
                        animateTransitions={true} />
                      </View>
                    )}
                  } />
                  :
                  <ListView                                                                       //list of names/intensities
                  dataSource={ds.cloneWithRows(Object.keys(this.state.negativeObj))}
                  renderRow={rowData => {
                    let n = rowData;
                    return (
                      <View style={styles.sliderBox}>
                        <Text style={{color: 'white', fontSize: 20}}>{n}: {this.state.negativeObj[n]}</Text>
                        <Slider
                          style={{width: "80%"}}
                          value={this.state.negativeObj[n]}
                          onSlidingComplete={(val) => {this.updateVal(val, n)}}
                          step={1}
                          minimumValue={0}
                          maximumValue={10}
                          thumbTintColor={"white"}
                          minimumTrackTintColor={"white"}
                          maximumTrackTintColor={"white"}
                          animateTransitions={true} />
                        </View>
                      )}
                    } />
                  }

                  {this.state.positiveBool ?
                    <View style={{alignItems: 'center'}}>                                                         //positive or negative at top
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toNegatives()}>
                      <Text style={{fontSize: 16, color: "white", fontFamily:"Cochin"}}>Next</Text>
                    </TouchableOpacity>
                  </View>


                  :

                  <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toEffectiveness()}>
                      <Text style={{fontSize: 16, color: "white", fontFamily:"Cochin"}}>Next</Text>
                    </TouchableOpacity>
                  </View>



                }

              </View>

              :

              <View style={{display: 'flex', flex: 1, backgroundColor: "#00a3cc"}}>


                <Text style={styles.contentText}>How useful was the suggestion?</Text>


                <Text style={styles.contentText}>{this.state.score}</Text>


                <View style={styles.sliderBox}>
                  <Slider
                    style={{width: "80%"}}
                    value={this.state.score}
                    onValueChange={(val) => this.setState({score: val})}
                    step={1}
                    minimumValue={0}
                    maximumValue={10}
                    thumbTintColor={"white"}
                    minimumTrackTintColor={"white"}
                    maximumTrackTintColor={"white"}
                    animateTransitions={true} />
                  </View>

                  <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.toFinal()} style={styles.doneButton}>
                      <Text style={{fontSize: 16, color: "white", fontFamily:"Cochin", fontWeight:"500"}}>Done</Text>
                    </TouchableOpacity>
                  </View>


                </View>
              }

            </View>

          )
        }
      }

      const styles = StyleSheet.create({
        sliderBox: {
          paddingTop: 15,
          height: 80,
          width: "100%",
          alignItems: 'center'
        },
        slider:{
          alignItems: "center",
          justifyContent: "center",
        },
        contentText:{
          color: "white",
          textAlign: 'center',
          fontSize: 50,
          fontFamily:"Georgia"
        },
        buttonStyle: {
          borderColor: 'white',
          width: 120,
          height: 35,
          borderRadius: 15,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        doneButton: {
          borderColor: 'white',
          width: 120,
          height: 35,
          borderRadius: 15,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
