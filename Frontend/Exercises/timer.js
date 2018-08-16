import React from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Button, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import TimerCountdown from 'react-native-timer-countdown';

export default class TimerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      name: "",
      start: false,
      end: false,
      duration: 0,
    };
  }


  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      name: userInfo.name
    })
  }


  minToMili(min){
    return min * 60000
  }

  toreEvaluate(){
    let userInfo = {
      userid: this.state.userid,
      name: this.state.name
    }
    this.props.navigation.navigate('Reevaluate', {userInfo: userInfo});
  }


  render() {
    return (

      <View style={{display:'flex', flex:1, backgroundColor: "#CAE2D0"}}>

        {this.state.end ?

          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.toreEvaluate()} style={styles.doneButton}>
              <Text style={{fontSize: 25, color: "#505a53", fontFamily:"Cochin"}}>Done</Text>
            </TouchableOpacity>
          </View>

          :

          <View>

            {this.state.start ?

              <View style={{alignItems:'center', marginTop:"50%"}}>
                <TimerCountdown
                  initialSecondsRemaining={this.minToMili(this.state.duration)}
                  allowFontScaling={true}
                  style={{fontSize: 50}}
                  onTimeElapsed={() => this.setState({end: true})}
                />

                <View style={{alignItems:'center'}}>
                  <Text style={styles.list}>
                    Here are some ideas for exercises:
                  </Text>
                  <Text style={styles.list}>
                    Jumping jacks
                  </Text>
                  <Text style={styles.list}>
                    Push ups
                  </Text>
                  <Text style={styles.list}>
                    Jog in place
                  </Text>
                  <Text style={styles.list}>
                    Burpees
                  </Text>
                  <Text style={styles.list}>
                    Run up stairs
                  </Text>
                </View>
              </View>

              :

              <View style={{alignItems:'center'}}>

                <Text style={{textAlign:"center", color:"#505a53", fontFamily:"Georgia", fontSize: 30, margin:"5%", marginTop: "20%"}}>Enter the number of minutes you would like to exercise</Text>

                <TextInput
                  style={{height: "25%", borderWidth: 2, backgroundColor: "white", borderColor: "white", width: "80%"}}
                  onChangeText={(text) => this.setState({duration: text})}
                />

                <TouchableOpacity>
                  <Text style={{color:"#505a53", textAlign:'center', fontSize: 20, marginTop: "5%"}} onPress={()=> this.setState({start: true})}>Start</Text>
                </TouchableOpacity>

              </View>

            }

          </View>
        }

      </View>
    );
  }
}


const styles = StyleSheet.create({
  doneButton: {
    marginTop: "50%",
    borderColor: 'white',
    width: 200,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    color: "#505a53",
    fontSize: 20
  }
})
