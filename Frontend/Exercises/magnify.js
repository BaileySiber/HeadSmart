import React from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Button, ListView, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper'



export default class GroundingScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      userid: "",
      name: ""
    };
  }

  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      name: userInfo.name
    })
  }

  toreEvaluate(){
    let userInfo = {
      userid: this.state.userid,
      name: this.state.name
    }
    this.props.navigation.navigate('Reevaluate', {userInfo: userInfo});
  }

  static navigationOptions = {
    title: 'Swiper'
  };

  render() {
    return (
      <Swiper>
        <Instructions/>
        <SliderOne/>
        <Questions/>
        <SliderTwo/>
        <Done Reevaluate={this.toreEvaluate.bind(this)}/>
      </Swiper>
    );
  }
}



class Instructions extends React.Component{
  static navigationOptions = {
    title: 'Instructions'
  };

  render() {
    return (
      <View style={styles.container}>
        <Animatable.Text animation="fadeInDown" style={styles.instructions}>
           Checking your magnification is helpful when you are feeling shameful or guilty.
        </Animatable.Text>
        <Animatable.Text animation="fadeInDown" style={{fontSize: 20, fontStyle: 'italic'}}>
          Swipe left to get started...
        </Animatable.Text>
      </View>
    )
  }
}




//fade in each text input after the prior has been completed...show swipe option after
class SliderOne extends React.Component {
  state = {
    intro: true,
    score: 0
    slider: false,
    done: false
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.intro ?
          <TouchableOpacity onPress={()=> this.setState({
            intro:false,
            slider:true
          })}>
          <Animatable.Text animation="fadeIn" style={styles.instructions}>
            Let's start by rating how guilty or shameful you feel... click here when you are ready
          </Animatable.Text>
        </TouchableOpacity> : null}

        {this.state.slider ?

          <Text style={styles.contentText}>My feelings of guilt/shame are a: {this.state.score}</Text>

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

          <TouchableOpacity onPress={() => this.setState({
            slider: false,
            done: true
          })}>
          <Text> Next </Text>
        </TouchableOpacity>


        :

        null}

        {this.state.done ?
          <Animatable.Text animation="slideInDown" style={styles.instructions}>
            Swipe left to continue...
          </Animatable.Text>
          : null}
        </View>
      )
    }
  }


    class Inputs extends React.Component{
      render() {
        return (
          <View style={styles.container}>
            <Text>
              Next let's look around your current environment...tell me:
            </Text>
            <Text>
              How many red things can you find or see?
            </Text>
            <TextInput placeholder="enter here"
              style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
              <Text>
                How many blue?
              </Text>
              <TextInput placeholder="enter here"
                style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
                <Text>
                  How many people are there?
                </Text>
                <TextInput placeholder="enter here"
                  style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
                  <Text>
                    What sounds do you hear?
                  </Text>
                  <TextInput placeholder="enter here"
                    style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
                    <Text>
                      Awesome - swipe left!
                    </Text>
                  </View>
                )
              }
            }

            class Done extends React.Component{
              static navigationOptions = {
                title: 'Done'
              };

              goBack() {
                this.props.navigation.navigate('Instructions')
              }

              render() {
                return (
                  <View style={styles.container}>
                    <Animatable.Text animation="fadeIn" style={styles.instructions}>
                      Good job - you have completed this exercise!
                    </Animatable.Text>
                    <Animatable.Text animation="fadeIn" style={styles.instructions}>
                      If you need more, swipe left!
                    </Animatable.Text>
                    <TouchableOpacity onPress={this.props.Reevaluate}>
                      <Animatable.Text animation="fadeIn" style={styles.instructions}>
                        Done
                      </Animatable.Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            }



            const styles = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: '#4dd6ba',
                alignItems: 'center',
                justifyContent: 'center',
              },
              instructions:{
                fontSize: 30,
                fontWeight: "bold",
                color: "grey",
              },
              doneButton: {
                marginTop: "50%",
                borderColor: 'white',
                width: 200,
                height: 100,
                borderRadius: 15,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center'
              },
               contentText:{
                  color: "white",
                  textAlign: 'center',
                  fontSize: 50,
                  fontFamily:"Georgia"
                },
              sliderBox: {
                paddingTop: 15,
                height: 80,
                width: "100%",
                alignItems: 'center'
              }
            });
