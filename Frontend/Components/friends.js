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


  removeFriend(id) {
    console.log('removing friend', id);
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
          console.log('json in removeFriend is  ------' + json)
          this.setState({
            friendList: json
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
      if(json.status === 200){
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
      if(json.status === 200){

        fetch(url + '/' + this.state.userid + '/getFriends')
        .then(response => response.json())
        .then(result => {
          this.setState({
            friendList: result
          });
          fetch(url + '/' + this.state.userid + '/getPending')
          .then(response => response.json())
          .then(result => {
            this.setState({
              pendingList: result
            })
          })
        })
      }
    })
    .catch(err => console.log(err))
  }

  //deleting friendRequest using removeFriend route
  deleteRequest(id) {
    console.log('in delete')
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

        <Text style={{flex:1, fontFamily: "Georgia", fontSize: 30, textAlign: 'center', margin: "5%", marginTop: "10%", color: "#79877c"}}>
          Friends:
        </Text>

        <View style={{flex:2}}>
          {this.state.friendList.length ?
            <ListView dataSource={ds.cloneWithRows(this.state.friendList)}
              renderRow={(friend, i) => (
                <View style={{display: 'flex', flexDirection:'row'}}>
                  <Text>{friend.name}</Text>
                  <Button
                    onPress={() => this.removeFriend(friend.id)}
                    title="delete"
                    >
                    </Button>
                  </View>
                )}
              />
              : null }
            </View>


            <View style={{flex:1, marginTop: "1%", marginBottom:"1%", alignItems:'center'}}>
              <Image style={{height:70, width: 190}} source={require('./whales.png')}/>
            </View>

            <View style={{flex:1}}>
              <View style={{marginTop:"1%", display:'flex', flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                <View style={{flex: 2, alignItems: 'center', justifyContent:'center', marginLeft:"1%"}}>
                  <Text style={{marginBottom:"1%", fontFamily: "Georgia", fontSize: 20, textAlign: 'center', color: "#79877c"}}>
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
                  <TouchableOpacity style={styles.addButton} onPress={() => this.sendRequest(this.state.friend)}>
                    <Text style={styles.buttonLabel}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>


            <View style={{flex:1}}>
              <Text style={{fontSize: 20, textAlign: 'center', margin: "5%", marginTop: "5%", color: "#79877c"}}>
                Pending Requests
              </Text>
            </View>

            <View style={{flex:2}}>
              {this.state.pendingList.length ?
                <ListView style={{paddingTop:"5%", paddingBottom:"5%"}} dataSource={ds.cloneWithRows(this.state.pendingList)}
                  renderRow={(friend, i) => (
                    <View style={{display: 'flex', flexDirection:'row'}}>
                      <Text>{friend.name}</Text>
                      <Button
                        onPress={() => this.acceptRequest(friend.id)}
                        title="accept"
                        >
                        </Button>
                        <Button
                          onPress={() => this.deleteRequest(friend.id)}
                          title="delete"
                          >
                          </Button>
                        </View>
                      )}
                    />
                    : null }
                  </View>
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
            buttonLabel: {
              fontFamily:"Cochin",
              color:"#79877c",
              textAlign: 'center',
              fontSize: 15
            }
          })
