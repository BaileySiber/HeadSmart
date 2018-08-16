import React from 'react';
import url from './url';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage } from 'react-native';
  import { LinearGradient } from 'expo';
  import { Slider } from 'react-native-elements';
  import moment from "moment";


  export default class EmotionsScreen extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        userid: '',
        entries: {}
      }
    }

    componentDidMount() {
      let userInfo = this.props.navigation.getParam('userInfo');            //userinfo = userid and mood value
      userInfo && this.setState({
        userid: userInfo.userid
      });

      fetch(url + '/' + userInfo.userid + '/oldLogs')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          entries: json
        })
      })
    }

    navFullLog(id){
      fetch(url + '/' + id + '/showSingleLog')
      .then(resp => resp.json())
      .then(json => {
        let userInfo = {
          log: json,
          userid: this.state.userid
        }
        this.props.navigation.navigate('ShowLog', {userInfo: userInfo});
      })
      .catch(err => console.log('err sending full log info' + err))
    }

    render(){
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      return(
        <View>
          <LinearGradient style={{height:"100%"}} colors={["#CAE2D0", "#CAE2D0"]}>

            <Text style={{fontFamily:"Georgia", color:"#505a53", textAlign:'center', fontSize: 40, marginBottom: "5%", marginTop: "5%"}}>
              Old logs
            </Text>
              <ListView                                                                       //list of names/intensities
              dataSource={ds.cloneWithRows(Object.keys(this.state.entries).reverse())}
              renderRow={rowData => {
                let n = rowData;
                return (
                  <View style={styles.entryBox}>
                    <TouchableOpacity style={styles.log} onPress={() => this.navFullLog(this.state.entries[n]._id)}>
                    <Text style={{color: '#505a53', fontSize: 20, textAlign:'center'}}>{moment(this.state.entries[n].creationTime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
                    </TouchableOpacity>
                    </View>
                  )}
                } />
              </LinearGradient>
            </View>
          )}
      }

      const styles = StyleSheet.create({
        entryBox: {
          alignItems: 'center',
          marginLeft: "5%",
          marginRight: "5%",
          marginBottom: '5%'
        },
        log: {
          padding: "5%",
          backgroundColor: '#e9f3ec',
          borderRadius: 10,
        }
      })
