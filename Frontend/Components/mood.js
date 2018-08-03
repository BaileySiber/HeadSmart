import React from 'react';
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
  //import CircularSlider from "react-native-circular-slider"
  //"react-native" link "react-native-svg"

  export default class HomeScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        value: 4,
        userid: ''
      }
    }

    logout() {
      //fetch logout
      this.props.navigation.navigate('Login');
    }

    componentDidMount(){
      let userInfo = this.props.navigation.getParam('userInfo');
      this.setState({
        userid: userInfo.userid
      });
    }

    continue() {
      //make sure circle slider sets color as number in state
      //pass that number when redirecting to grid
      this.props.navigation.navigate('Emotions', {userInfo: this.state}) //, {color: this.state.color});
    }

    render() {
      return(
        <View>
          <LinearGradient style={{height:"100%"}} colors={["#00a3cc", "white"]} >

            {/* <View style={{justifyContent: 'center', height:"50%"}}> */}
              <View style={styles.contentBox}>
                <Text style={styles.contentText}>How are you?</Text>
              </View>

              <View style={{alignItems:"center"}}>
                <Text style={styles.contentText}>{this.state.value}</Text>
              </View>


              <View style={styles.slider}>
                <Slider
                  style={{width: "80%"}}
                  value={this.state.value}
                  onValueChange={(val) => this.setState({value: val })}
                  //orientation={"vertical"}
                  step={1}
                  minimumValue={1}
                  maximumValue={7}
                  thumbTintColor={"#49677f"}
                  minimumTrackTintColor={"white"}
                  maximumTrackTintColor={"white"}
                  animateTransitions={true} />
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                  <TouchableOpacity onPress={this.continue.bind(this)} style={styles.nextButton}>
                    <Text style={{fontSize: 16, color: "white", fontFamily:"Cochin", fontWeight:"500"}}>Next</Text>
                  </TouchableOpacity>
                </View>

            </LinearGradient>
          </View>
        )
      }
    }

    const styles = StyleSheet.create({
      container: {
        width: "100%"
      },
      slider:{
        height:"20%",
        alignItems: "center",
        justifyContent: "center",
      },
      contentBox:{
        alignItems: 'center',
        justifyContent: 'center',
        height: "16%",
        marginTop: 50
      },
      contentText:{
        color: "white",
        fontSize: 50,
        fontFamily:"Georgia"
      },
      nextButton: {
        borderColor: 'white',
        width: 120,
        height: 35,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      nav: {
        height: "34%",
      }
    });
