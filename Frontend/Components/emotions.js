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
        userid: '',
        value: ''
      }
    }

    componentDidMount() {
      let userInfo = this.props.navigation.getParam('userInfo');            //userinfo = userid and mood value
      userInfo && this.setState({
        userid: userInfo.userid,
        value: userInfo.value
      });
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

    toGrid() {
      let posArr = Object.keys(this.state.positiveObj).map((emotion) => ({'name': emotion, 'intensity': this.state.positiveObj[emotion]}))
      let negArr = Object.keys(this.state.negativeObj).map((emotion) => ({'name': emotion, 'intensity': this.state.negativeObj[emotion]}))
      let finalArr = posArr.concat(negArr)
      let userInfo = {
        userid: this.state.userid,
        emotions: finalArr,
        value: this.state.value
      }
      this.props.navigation.navigate('Grid', {userInfo: userInfo})
    }

    render(){
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      return(
        <View>
          <LinearGradient style={{height:"100%"}} colors={["#CAE2D0", "#CAE2D0"]}>

            <View style={{height: 80}}>
              {this.state.positiveBool ?
                <View style={{alignItems:"center", justifyContent:"center", paddingTop:15}}>
                  <Text style={{color:"#505a53", fontFamily: "Cochin", fontSize: 50}}>Positive</Text>
                </View>
                :
                <View style={{alignItems:"center", justifyContent:"center", paddingTop:15}}>
                  <Text style={{color:"#505a53", fontFamily: "Cochin", fontSize: 50}}>Negative</Text>
                </View>
              }
            </View>

            {this.state.positiveBool ?
              <ListView                                                                       //list of names/intensities
              dataSource={ds.cloneWithRows(Object.keys(this.state.positiveObj))}
              renderRow={rowData => {
                let n = rowData;
                return (
                  <View style={styles.sliderBox}>
                    <Text style={{color: '#505a53', fontSize: 20}}>{n}: {this.state.positiveObj[n]}</Text>
                    <Slider
                      style={{width: "80%"}}
                      value={this.state.positiveObj[n]}
                      onSlidingComplete={(val) => {this.updateVal(val, n)}}
                      step={1}
                      minimumValue={0}
                      maximumValue={10}
                      thumbTintColor={"#505a53"}
                      minimumTrackTintColor={"#505a53"}
                      maximumTrackTintColor={"#505a53"}
                      animateTransitions={true} />
                    </View>
                  )}
                } /> :
                <ListView                                                                       //list of names/intensities
                dataSource={ds.cloneWithRows(Object.keys(this.state.negativeObj))}
                renderRow={rowData => {
                  let n = rowData;
                  return (
                    <View style={styles.sliderBox}>
                      <Text style={{color: '#505a53', fontSize: 20}}>{n}: {this.state.negativeObj[n]}</Text>
                      <Slider
                        style={{width: "80%"}}
                        value={this.state.negativeObj[n]}
                        onSlidingComplete={(val) => {this.updateVal(val, n)}}
                        step={1}
                        minimumValue={0}
                        maximumValue={10}
                        thumbTintColor={"#505a53"}
                        minimumTrackTintColor={"#505a53"}
                        maximumTrackTintColor={"#505a53"}
                        animateTransitions={true} />
                      </View>
                    )}
                  } />
                }

                {this.state.positiveBool ?
                  <View style={{alignItems: 'center', marginBottom: "5%"}}>                                                                   //positive or negative at top
                  <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toNegatives()}>
                    <Text style={{fontSize: 25, color: "#79877c", fontFamily:"Cochin"}}>Next</Text>
                  </TouchableOpacity>
                </View>
                  :
                  <View style={{alignItems: 'center', marginBottom: "5%"}}>
                  <TouchableOpacity style={styles.buttonStyle} onPress={() => this.toGrid()}>
                    <Text style={{fontSize: 25, color: "#79877c", fontFamily:"Cochin"}}>Done</Text>
                  </TouchableOpacity>
                </View>
                }

              </LinearGradient>
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
        Title: {
          textAlign: 'center',
          fontSize: 20
        },
        buttonStyle: {
          borderColor: '#e9f3ec',
          backgroundColor: "#e9f3ec",
          width: 120,
          height: 35,
          borderRadius: 15,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
