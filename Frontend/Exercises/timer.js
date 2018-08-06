import React from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import TimerCountdown from 'react-native-timer-countdown';

export default class TimerScreen extends React.Component {
  state = {
    start: false,
    duration: 0,
    exercise: 'run'
  }

  minToMili(min){
    return min * 60000
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 100, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}
          placeholder=" How long do you want to go?"
          onChangeText={(text) => this.setState({duration: text})}
        />
        <Text style={{fontSize: 20, opacity: .5}}>(please enter in minutes!)</Text>
        <Button onPress={()=> this.setState({start: true})} title="Start your thingy"/>
        {this.state.start ?
          <TimerCountdown
              initialSecondsRemaining={this.minToMili(this.state.duration)}
              // onTick={secondsRemaining => console.log('tick', secondsRemaining)} It returns the remaining seconds.
              // onTimeElapsed={() => console.log('complete')} A function to call when the countdown completes
              allowFontScaling={true}
              style={{ fontSize: 20 }}
          />
        : null}
      </View>
    );
  }
}
