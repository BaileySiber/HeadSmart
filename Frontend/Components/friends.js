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
      showPending: false
    }
    let userInfo = this.props.navigation.getParam('userInfo');
    fetch(url + '/' + userInfo.userid + '/getFriends')
    .then(response => response.json())
    .then(result => {
      this.setState({
        friendList: result,
        userid: userInfo.userid
      });
      return fetch(url + '/' + userInfo.userid + '/getPending')
    })
    .then(response => response.json())
    .then(result => {
      this.setState({
        pendingList: result
      })
    })
    .catch(err => console.log(err))
  }


  removeFriendHelper(id){
    Alert.alert(
      'Are you sure you want to delete this friend?',
      '',
      [
        { text: 'Yep', onPress: () => this.removeFriend(id) },
        { text: 'Nevermind'},
      ],
    )
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
        fetch(url + '/' + this.state.userid + '/getFriends')
        .then(result => result.json())
        .then(json => {
          this.setState({
            friendList: json
          });
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  }

  sendRequestHelper(username){
    if(this.state.friendList.length === 0) {
      Alert.alert(
        'Warning!',
        'Remember that friends will be able to see your most recent logged mood in their friend list. Make sure to only send requests to people you trust!',
        [
          { text: 'Send', onPress: () => this.sendRequest(username) },
          { text: 'Nevermind'},
        ],
      )
    }
    else {
      this.sendRequest(username)
    }
  }

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
      if(json.status === 200){
        this.setState({friend: ""})
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


  acceptRequestHelper(id){
    if(this.state.friendList.length === 0) {
      Alert.alert(
        'Warning!',
        'Remember that friends will be able to see your most recent logged mood in their friend list. Make sure to only accept requests from people you trust!',
        [
          { text: 'Accept', onPress: () => this.acceptRequest(id) },
          { text: 'Nevermind'},
        ],
      )
    }
    else{
      this.acceptRequest(id)
    }
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
      if(json.status === 200){
        fetch(url + '/' + this.state.userid + '/getPending')
        .then(response => response.json())
        .then(result => {
          this.setState({
            pendingList: result
          })
        })
        fetch(url + '/' + this.state.userid + '/getFriends')
        .then(response => response.json())
        .then(result => {
          this.setState({
            friendList: result
          });
        })
      }
    })
    .catch(err => console.log(err))
  }


  deleteRequestHelper(id){
    Alert.alert(
      'Are you sure you want to delete this request?',
      '',
      [
        { text: 'Yep', onPress: () => this.deleteRequest(id) },
        { text: 'Nevermind'},
      ],
    )
  }


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
        fetch(url + '/' + this.state.userid + '/getPending')
        .then(response => response.json())
        .then(result => {
          this.setState({
            pendingList: result
          });
          Alert.alert(
            'Request deleted!',
            "Request has been removed from your pending list",
            [
              { text: 'OK'}
            ]
          )
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
  }

  render(){
    return (
      <View style={{display: 'flex', flex:1, backgroundColor:"#CAE2D0", height: '100%'}}>

        <Text style={{flex:1, fontFamily: "Georgia", fontSize: 25, textAlign: 'center', margin: "5%", color: "#505a53"}}>
          Friends:
        </Text>

        <View style={{flex:1}}>
          {this.state.friendList.length ?
            <ListView dataSource={ds.cloneWithRows(this.state.friendList)}
              renderRow={(friend, i) => (
                <View style={styles.friendDisplay}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={styles.friendName}>{friend.emo}</Text>
                  <TouchableOpacity>
                    <Icon name='delete' onPress={() => this.removeFriendHelper(friend.id)}/>
                  </TouchableOpacity>
                </View>
              )}
            />
            : null }
          </View>

          <View style={{flex:1, alignItems:'center'}}>
            <Image style={{height:70, width: 190}} source={require('./whales.png')}/>
          </View>

          <View style={{flex:1}}>
            <View style={{marginTop:"1%", display:'flex', flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
              <View style={{flex: 2, alignItems: 'center', justifyContent:'center', marginLeft:"1%"}}>
                <Text style={{marginBottom:"1%", fontFamily: "Georgia", fontSize: 20, textAlign: 'center', color: "#505a53"}}>
                  Send friend request:
                </Text>
                <TextInput
                  style={{
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
              </View>
              <View style={{flex: 1, alignItems: 'center', justifyContent:'center', marginTop:"5%"}}>
                <TouchableOpacity style={styles.addButton} onPress={() => this.sendRequestHelper(this.state.friend)}>
                  <Text style={styles.buttonLabel}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {this.state.showPending ?

            <View style={{flex:1}}>
              {this.state.pendingList.length ?
                <ListView style={{paddingTop:"5%", paddingBottom:"5%"}} dataSource={ds.cloneWithRows(this.state.pendingList)}
                  renderRow={(friend, i) => (
                    <View style={styles.friendDisplay}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <TouchableOpacity>
                        <Icon name="person-add" onPress={() => this.acceptRequestHelper(friend.id)} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginLeft:"3%"}}>
                        <Icon name='delete' onPress={() => this.deleteRequestHelper(friend.id)}/>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                : <Text style={styles.friendName}>No requests!</Text> }
              </View>

              :

              <View style={{flex:1, alignItems: 'center'}}>
                <TouchableOpacity style={styles.reqButton} onPress={() => this.setState({showPending: true})}>
                  <Text style={styles.buttonLabel}>Show Requests</Text>
                </TouchableOpacity>
              </View>

            }

          </View>
        )
      }
    }

    const styles = StyleSheet.create({
      addButton: {
        alignItems: 'center',
        padding: 10,
        borderColor: "white",
        borderRadius: 5,
        borderWidth: 3,
        width: 75
      },
      reqButton: {
        alignItems: 'center',
        padding: 10,
        borderColor: "white",
        borderRadius: 5,
        borderWidth: 3,
        width: 160
      },
      buttonLabel: {
        fontFamily:"Cochin",
        color:"#505a53",
        textAlign: 'center',
        fontSize: 20
      },
      friendDisplay: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      friendName: {
        color: "#505a53",
        fontFamily: 'Georgia',
        fontSize: 20,
        textAlign: 'center',
        marginRight: '5%'
      }
    })
