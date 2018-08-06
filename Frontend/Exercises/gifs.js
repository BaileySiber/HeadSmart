import React from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Button, ListView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios'; //npm install axios

const API_KEY = process.env.API_KEY;
export default class App extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      search: false,
      searchStr: ""
    };
  }


  componentDidMount(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const queryUrl = "http://api.giphy.com/v1/gifs/search?limit=10&q=funny&api_key=" + API_KEY;
    axios.get(queryUrl).then(response => {
      console.log(response.data)
      this.setState({dataSource: ds.cloneWithRows(response.data.data)});
    }).catch(error => console.log(error.message));
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{margin: 20}}>
        </View>
        <Animatable.Text style={{fontSize: 20, margin: 20, color: "#F718A4"}}
          animation="jello" iterationCount="infinite"
          >Gifs For You!</Animatable.Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(gif) => <Image
          style={{width: 350, height: 250}}
          source={{uri: gif.images.downsized.url}} />
          }
        />
      </View>
    );
  }
}
