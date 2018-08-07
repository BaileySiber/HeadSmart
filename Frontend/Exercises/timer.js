import React from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Button, TouchableOpacity } from 'react-native';
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

      <View style={{display:'flex', flex:1, backgroundColor: "#b3e0ff"}}>

        {this.state.end ?

          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.toreEvaluate()} style={styles.doneButton}>
              <Text style={{fontSize: 40, color: "black", fontFamily:"Cochin"}}>Done</Text>
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

              <Text style={{fontSize: 20, margin:"5%", marginTop: "10%"}}>
                Here are some ideas for exercises:
                - Jumping jacks
                - Push ups
                - Run in place
                - Burpees
                - Run up stairs

              </Text>

              </View>


              :

              <View style={{alignItems:'center'}}>

                <Text style={{fontSize: 20, margin:"5%", marginTop: "10%"}}>Enter number of minutes you would like to exercise</Text>

                <TextInput
                  style={{height: "34%", borderWidth: 2, borderColor: "grey", width: "80%"}}
                  placeholder="Enter time here"
                  onChangeText={(text) => this.setState({duration: text})}
                />

                <Button onPress={()=> this.setState({start: true})} title="Start"/>
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
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
