import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button
} from "react-native"
import { LinearGradient } from "expo";

export default class LetterSelfScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      userid: "",
      name: "",
      show: false,
      journal: ''
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


  render(){
    return (
      <View style={{backgroundColor:"#00a3cc", alignItems:'center', height: '100%'}}>
        {this.state.show ? <View style={{alignItems:"center", justifyContent:"center"}}>
          <TextInput
            style={{
              margin: 15,
              width: '80%',
              height: '80%',
              borderColor: "white",
              borderWidth: 2
            }}
            value={this.state.journal}
            multiline = {true}
            placeholder="Write your journal here"
            onChangeText={text => {
              this.setState({ journal: text })}
            }
          />
          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.toreEvaluate()} style={styles.doneButton}>
              <Text style={{fontSize: 30, color: "white", fontFamily:"Cochin"}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View> :

        <View>


        <Text style={{fontSize: 20, textAlign: 'center', margin: "5%", marginTop: "10%", color: "white"}}>
          Write a letter addressed to yourself, forgiving yourself for whatever you are feeling down about. Think about what you would write if you were forgiving a friend!
        </Text>
        <Text style={{fontSize: 14, textAlign: 'center', marginTop: "5%", marginLeft:'10%', marginRight:'10%', color: "white"}}>
          You can send it to your future self if you want!
        </Text>
        <TouchableOpacity onPress={() => this.setState({show: true})} style={styles.doneButton}>
          <Text style={{fontSize: 25, color: "white", fontFamily:"Cochin"}}>Let's Write!</Text>
        </TouchableOpacity>

        </View>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  doneButton: {
    borderColor: 'white',
    width: 100,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
