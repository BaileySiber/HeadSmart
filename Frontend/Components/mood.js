import React from 'react';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Image,
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
      this.props.navigation.navigate('Login');
    }

    componentDidMount(){
      let userInfo = this.props.navigation.getParam('userInfo');
      this.setState({
        userid: userInfo.userid
      });
    }

    continue() {
      this.props.navigation.navigate('Emotions', {userInfo: this.state})
    }

    render() {
      return(
        <LinearGradient style={{display: 'flex', flex: 1}} colors={["#CAE2D0", "#CAE2D0"]} >

          <View style={styles.contentBox}>
            <Text style={styles.contentText}>How are you?</Text>
          </View>

          <View style={{alignItems:"center", flex: 1}}>
            <Text style={styles.val}>{this.state.value}</Text>
          </View>


          <View style={styles.slider}>
            <Slider
              style={{width: "80%"}}
              value={this.state.value}
              onValueChange={(val) => this.setState({value: val })}
              step={1}
              minimumValue={1}
              maximumValue={7}
              thumbTintColor={"#505a53"}
              minimumTrackTintColor={"#505a53"}
              maximumTrackTintColor={"#505a53"}
              animateTransitions={true} />
            </View>

            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', marginLeft: "5%", marginRight: "5%"}}>
              <Image style={{height:40, width: 40}} source={require('./sad.png')}/>
              <Image style={{height:40, width: 40}} source={require('./happy.png')}/>
            </View>

            <View style={{flex: 3, alignItems: 'center'}}>
              <TouchableOpacity onPress={this.continue.bind(this)} style={styles.nextButton}>
                <Text style={{fontSize: 30, color: "#79877c", fontFamily:"Cochin"}}>Next</Text>
              </TouchableOpacity>
            </View>

          </LinearGradient>
        )
      }
    }

    const styles = StyleSheet.create({
      slider:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      contentBox:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 50
      },
      contentText:{
        color: "#505a53",
        fontSize: 50,
        fontFamily:"Georgia"
      },
      val:{
        color: "#505a53",
        fontSize: 60,
        fontFamily:"Georgia"
      },
      nextButton: {
        width: 150,
        height: 50,
        borderRadius: 15,
        borderWidth: 3,
        justifyContent: 'center',
        backgroundColor: '#e9f3ec',
        borderColor: '#e9f3ec',
        alignItems: 'center'
      }
    });
