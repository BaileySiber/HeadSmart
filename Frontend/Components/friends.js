import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage
} from "react-native"
import { LinearGradient } from "expo";
import { List, ListItem, Icon } from 'react-native-elements'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (r1 !== r2)})
export default class FriendsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userid: "",
      friendList: [],
      pendingList: [],
      friend: '',
    }
    let userInfo = this.props.navigation.getParam('userInfo');
    console.log(userInfo.userid)
    fetch(url + '/' + userInfo.userid + '/getFriends')
    .then(response => response.json())
    .then(result => {
      this.setState({
        friendList: result.friends,
        userid: userInfo.userid
      });
      console.log('getting friendList', result)
      return fetch(url + '/' + userInfo.userid + '/getPending')
    })
    .then(response => response.json())
    .then(result => {
      this.setState({
        pendingList: result.pending
      })
      console.log('getting pendingList', result)
    })
    .catch(err => console.log(err))
  }


    removeFriend(id) {
      let queryUrl = url + '/' + this.state.userid + '/removeFriend';
      fetch(queryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      })
      .then(response => response.json())
      .then(json => {
        if(json.status === 200){
          fetch(url + '/' + userInfo.userid + '/getFriends')
          .then(result => {
            this.setState({
              friendList: result
            });
          })
          .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    }


    //seding friendRequest
    sendRequest(username){
      let queryUrl = url + '/' + this.state.userid + '/friendRequestSend';
      fetch(queryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username
        })
      })
      .then(response => response.json())
      .then(json => {
        if(json[status] === 200){
          Alert.alert(
            "Sent!",
            "Waiting for the response",
            [{ text: "close" }] // Button
          );
          this.setState({
            friend: ''
          })
        }
      })
      .catch(err => console.log(err))
    }

    acceptRequest(id){
      let queryUrl = url + '/' + this.state.userid + '/friendRequestAccept';
      fetch(queryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      })
      .then(response => response.json())
      .then(json => {
        if(json === "request sent"){
          fetch(url + '/' + userInfo.userid + '/getFriends')
          .then(response => response.json())
          .then(result => {
            this.setState({
              friendList: result
            });
          })
          .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    }

    //deleting friendRequest using removeFriend route
    deleteRequest(id) {
      let queryUrl = url + '/' + this.state.userid + '/removeFriend';
      fetch(queryUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      })
      .then(response => response.json())
      .then(json => {
        if(json.status === 200){
          fetch(url + '/' + userInfo.userid + '/getPending')
          .then(response => response.json())
          .then(result => {
            this.setState({
              pendingList: result
            });
          })
          .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    }

    render(){
      return (
        <View style={{backgroundColor:"#CAE2D0", height: '100%'}}>
          <Text style={{fontFamily: "Georgia", fontSize: 30, textAlign: 'center', margin: "5%", marginTop: "10%", color: "#79877c"}}>
            Here are your friends!
          </Text>
          {this.state.friendList.length ?
            <List containerStyle={{marginBottom: 10}}>
              <ListView dataSource={ds.cloneWithRows(this.state.friendList)}
                renderRow={(friend, i) => (
                  <ListItem
                    leftIcon={<Icon name='account_box' />}
                    key={i}
                    title={friend.name}
                    subtitle={"Current Emotion : " + friend.emo.toString()}
                    rightIcon={<Icon name='delete' />}
                    onPressRightIcon={() => this.removeFriend(friend.id)} />
                )}/>
              </List>: null
            }

            <View style={{marginTop: "5%", alignItems:'center'}}>
            <Image style={{height:70, width: 190}} source={require('./whales.png')}/>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={{fontFamily: "Georgia", fontSize: 25, textAlign: 'center', marginTop: "5%", color: "#79877c"}}>
                Send friend request:
              </Text>
          <TextInput
            style={{
              margin: 15,
              width: 200,
              height: 35,
              borderColor: "white",
              backgroundColor: "white",
              borderWidth: 2
            }}
            placeholder="username"
            value={this.state.friend}
            onChangeText={text => {
              this.setState({ friend: text })}
            }
          />
          <TouchableOpacity style={styles.addButton} onPress={() => this.sendRequest(this.state.friend)}>
            <Text style={styles.buttonLabel}>Send</Text>
          </TouchableOpacity>
          </View>

          <Text style={{fontSize: 20, textAlign: 'center', margin: "5%", marginTop: "10%", color: "#79877c"}}>
            Pending Requests
          </Text>
          {this.state.pendingList.length ?
            <List>
              <ListView dataSource={ds.cloneWithRows(this.state.pendingList)}
                renderRow={(friend, i) => (
                  <ListItem
                    leftIcon={<Icon name='check_circle_outline' />}
                    leftIconOnPress={() => this.acceptRequest(friend.id)}
                    key={i}
                    title={friend.name}
                    rightIcon={<Icon name='delete' />}
                    onPressRightIcon={() => this.deleteRequest(friend.id)}
                  />
                )}
              />
            </List>
          : null }
        </View>
      )
    }
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 3,
    width: 150
  },
  buttonLabel: {
    fontFamily:"Cochin",
    color:"#79877c",
    textAlign: 'center',
    fontSize: 20
  }
})
