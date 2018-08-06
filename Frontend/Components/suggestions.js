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
      renderList: ds.cloneWithRows([]),
    }
  }

  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    let suggestions = userInfo.suggestions.suggestion
    console.log('suggestions in sug.js is -----------------------' + suggestions)
    this.setState({
      renderList: ds.cloneWithRows(suggestions),
    });
  }

  callExercise(name){
    //do stuff
  }

  render(){
    return(
      <View>
        <LinearGradient style={{height:"100%"}} colors={["#b3e0ff", "#00a3cc"]} >
          <ListView dataSource={this.state.renderList}
            renderRow={item => (
              <TouchableOpacity onPress={() => this.callExercise(item.name)}>
                  <Text>
                    {item.name}
                  </Text>
                  <Text>
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
