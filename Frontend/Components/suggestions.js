import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage
} from "react-native"
import { LinearGradient } from "expo";



const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)})
export default class SuggestionsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userid: "",
      renderList: ds.cloneWithRows([]),
    }
  }

  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    let suggestions = userInfo.suggestions.suggestion
    let userid = userInfo.userid
    this.setState({
      renderList: ds.cloneWithRows(suggestions),
      userid: userid
    });
  }

  callExercise(name){
    let userInfo = {
      userid: this.state.userid,
      name: name
    }
    switch(name) {
      case 'Physical activity':
        this.props.navigation.navigate("PhysicalActivity", {userInfo: userInfo})
        break;
      case 'Watch something funny':
        this.props.navigation.navigate("Funny", {userInfo: userInfo})
        break;
      case 'Gratitude list':
        this.props.navigation.navigate("Gratitude", {userInfo: userInfo})
        break;
      case 'Apology letter to self':
        this.props.navigation.navigate("letterSelf", {userInfo: userInfo})
        break;
      case 'Apology letter to someone else':
        this.props.navigation.navigate("letterOther", {userInfo: userInfo})
        break;
      case 'Check your magnification':
        this.props.navigation.navigate("Magnify", {userInfo: userInfo})
        break;
      case 'Call someone!':
        this.props.navigation.navigate("Call", {userInfo: userInfo})
        break;
      case 'Listen to music':
        this.props.navigation.navigate("Music", {userInfo: userInfo})
        break;
      case 'Take a shower':
        this.props.navigation.navigate("Shower", {userInfo: userInfo})
        break;
      case 'Write angry letter':
        this.props.navigation.navigate("letterAngry", {userInfo: userInfo})
        break;
      case 'Breathing exercise':
        this.props.navigation.navigate("Breathing", {userInfo: userInfo})
        break;
      case 'Drink something warm':
        this.props.navigation.navigate("Drink", {userInfo: userInfo})
        break;
      case 'Grounding exercise':
        this.props.navigation.navigate("Grounding", {userInfo: userInfo})
        break;
      case 'Eat!':
        this.props.navigation.navigate("Eat", {userInfo: userInfo})
        break;
    }

  }

  render(){
    return(
      <View>
        <LinearGradient style={{height:"100%", paddingTop: "10%"}} colors={["#b3e0ff", "#00a3cc"]} >
          <ListView dataSource={this.state.renderList}
            renderRow={item => (
              <TouchableOpacity onPress={() => this.callExercise(item.name)}>
                  <Text style={styles.name}>
                    {item.name}
                  </Text>
                  <Text style={styles.description}>
                    {item.description}
                  </Text>
              </TouchableOpacity>
            )}
          />
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    color:"white",
    fontSize: 30,
    textAlign: 'center',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: "Georgia"
  },
  description: {
    color:"white",
    fontSize: 15,
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%',
    marginTop: '5%',
    fontFamily: "Georgia"
  }
})
