import React from 'react';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
 } from 'react-native';
import * as Animatable from 'react-native-animatable';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)})
export default class GratListScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      userid: "",
      name: "",
      item: '',
      gratList: ds.cloneWithRows([]),
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

  addList(){
    this.setState({
      gratList: ds.cloneWithRows([...this.state.gratList, this.state.item]),
      item: ''
    })
  }

  render(){
    return (
      <View style={{backgroundColor:"#00a3cc", alignItems:'center', height: '100%'}}>
        <Text style={{fontSize: 25, textAlign: 'center', margin: "5%", marginTop: "10%", color: "white"}}>
          Write 10 things that you are grateful for about yourself!
        </Text>
        <ListView dataSource={this.state.renderList}
          renderRow={item => (
                <Text style={{fontSize: 12, textAlign: 'center', margin: "5%", marginTop: "10%", color: "white"}}>
                  {item}
                </Text>
          )}
        />
        <TextInput
          style={{
            margin: 15,
            width: 200,
            height: 40,
            borderColor: "white",
            borderWidth: 2
          }}
          placeholder=" Username"
          onChangeText={text => {
            this.setState({ item: text })}
          }
        />
        <TouchableOpacity onPress={() => this.addList} style={styles.donebutton}>
          <Text style={{fontSize: 30, color: "white", fontFamily:"Cochin"}}>Add!</Text>
        </TouchableOpacity>
          {this.state.gratList.length() === 10 ? <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={() => this.toreEvaluate()} style={styles.doneButton}>
              <Text style={{fontSize: 30, color: "white", fontFamily:"Cochin"}}>Done</Text>
            </TouchableOpacity>
          </View>: null}
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
