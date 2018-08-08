import React from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Button, ListView, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigator } from 'react-navigation';
import { Slider } from 'react-native-elements';
import Swiper from 'react-native-swiper'



export default class GroundingScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      userid: "",
      name: "",
      instructions: true,
      sliderOne: false,
      sliderOneInst: false,
      scoreOne: 0,
      scoreTwo: 0,
      questions: false,
      questionsInst: false,
      sliderTwoInst: false,
      sliderTwo: false,
      done: false
    };
  }

  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      name: userInfo.name,
    })
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

      <View>
        {this.state.instructions ?
          <View>
            <Animatable.Text animation="fadeInDown" style={styles.instructions}>
              Checking your magnification is helpful when you are feeling shameful or guilty.
            </Animatable.Text>
            <Animatable.Text onPress={()=> this.setState({
              instructions:false,
              sliderOne: true,
              sliderOneInst: true,
            })} animation="fadeInDown" delay={1000} style={{fontSize: 20, fontStyle: 'italic'}}>
            Let's go
          </Animatable.Text>
        </View>
        :
        null }

        {this.state.sliderOne ?
          <View>
            {this.state.sliderOneInst ?
              <View>
                <Animatable.Text animation="fadeIn">
                  Let's start by rating how guilty or shameful you feel...
                </Animatable.Text>
                <TouchableOpacity onPress={()=> this.setState({
                  sliderOneInst: false
                })}>
                <Animatable.Text delay={1000} animation="fadeIn">
                  Ok
                </Animatable.Text>
              </TouchableOpacity>
            </View>
            :

            <View>
              <Text >My feelings of guilt/shame are a: {this.state.scoreOne}</Text>
              <View style={styles.sliderBox}>
                <Slider
                  style={{width: "80%"}}
                  value={this.state.scoreOne}
                  onValueChange={(val) => this.setState({scoreOne: val})}
                  step={1}
                  minimumValue={0}
                  maximumValue={10}
                  thumbTintColor={"white"}
                  minimumTrackTintColor={"white"}
                  maximumTrackTintColor={"white"}
                  animateTransitions={true} />
                </View>

                <TouchableOpacity onPress={() => this.setState({
                  sliderOne: false,
                  questions: true,
                  questionsInst: true
                })}>
                <Text> Ok </Text>
              </TouchableOpacity>

            </View>
          }
        </View> : null }

        {this.state.questions ?
          <View>
            {this.state.questionsInst ?
              <View>
                <Animatable.Text animation="fadeIn" style={styles.instructions}>
                  When something goes wrong, it is easy to catastrophize or magnify the situation in an unproductive way
                </Animatable.Text>
                <Animatable.Text delay={1000} animation="fadeIn" style={styles.instructions}>
                  Let's make sure you aren't doing this. Think about the following questions when you are ready!
                </Animatable.Text>
                <TouchableOpacity onPress={()=> this.setState({
                  questionsInst: false
                })}>
                <Animatable.Text delay={2000} animation="fadeIn" style={styles.instructions}>
                  Let's go
                </Animatable.Text>
              </TouchableOpacity>
            </View>
            :
            <View>
              <Animatable.Text animation="fadeIn">
                Questions:
              </Animatable.Text>
              <Animatable.Text delay={1000} animation="fadeIn">
                Are you blaming yourself for something that wasn't really or entirely your fault?
              </Animatable.Text>
              <Animatable.Text delay={2000} animation="fadeIn">
                Are you making assumptions about what other people are thinking?
              </Animatable.Text>
              <Animatable.Text delay={3000} animation="fadeIn">
                Are you stuck in black-and-white/all-or-nothing thinking?
              </Animatable.Text>
              <Animatable.Text delay={4000} animation="fadeIn">
                Are you judging who you are over one action or mistake?
              </Animatable.Text>
              <Animatable.Text delay={5000} animation="fadeIn">
                Think about these questions for a bit, click Ok when you are ready to move on!
              </Animatable.Text>
              <TouchableOpacity onPress={()=> this.setState({
                questions: false,
                sliderTwoInst: true,
                sliderTwo: true,
              })}>
              <Animatable.Text delay={6000} animation="fadeIn">
                Ok
              </Animatable.Text>
            </TouchableOpacity>
          </View>
        }
      </View> : null }

      {this.state.sliderTwo ?
        <View>
          {this.state.sliderTwoInst ?
            <View>
              <Animatable.Text animation="fadeIn" style={styles.instructions}>
                Let's rerank how guilty or shameful you feel...
              </Animatable.Text>
              <TouchableOpacity onPress={()=> this.setState({
                sliderTwoInst: false
              })}>
              <Animatable.Text animation="fadeIn" style={styles.instructions}>
                Ok
              </Animatable.Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            <Text>My feelings of guilt/shame are a: {this.state.scoreTwo}</Text>
            <View style={styles.sliderBox}>
              <Slider
                style={{width: "80%"}}
                value={this.state.scoreTwo}
                onValueChange={(val) => this.setState({scoreTwo: val})}
                step={1}
                minimumValue={0}
                maximumValue={10}
                thumbTintColor={"white"}
                minimumTrackTintColor={"white"}
                maximumTrackTintColor={"white"}
                animateTransitions={true} />
              </View>
              <TouchableOpacity onPress={() => this.setState({
                sliderTwo: false,
                done: true
              })}>
              <Text> Ok </Text>
            </TouchableOpacity>
          </View>
        }
      </View> : null }

      {this.state.done ?
        <View>
          <Animatable.Text animation="fadeIn">
            Good job - you have completed this exercise!
          </Animatable.Text>
          <TouchableOpacity onPress={() => this.toreEvaluate()}>
            <Animatable.Text animation="fadeIn">
              Done
            </Animatable.Text>
          </TouchableOpacity>
        </View>
        :
        null }

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
  questions: {
    fontSize: 20
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
    height: "50%",
    width: "100%",
    alignItems: 'center'
  }
});
