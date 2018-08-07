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

      console.log(url + '/' + userInfo.userid + '/oldLogs')
      fetch(url + '/' + userInfo.userid + '/oldLogs')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          entries: json
        })
      })
    }

    navFullLog(n){
      console.log('n in function is ------' + n)
    }


    render(){
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      return(
        <View>
          <LinearGradient style={{height:"100%"}} colors={["#00a3cc", "#00a3cc"]}>

            <Text>
              Old logs
            </Text>
              <ListView                                                                       //list of names/intensities
              dataSource={ds.cloneWithRows(Object.keys(this.state.entries))}
              renderRow={rowData => {
                let n = rowData;
                return (
                  <View style={styles.entryBox}>
                    <TouchableOpacity onPress={(n) => this.navFullLog(n)}>
                    <Text style={{color: 'white', fontSize: 20}}>{n}:{this.state.entries[n].creationTime}</Text>
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
          paddingTop: 15,
          height: 80,
          width: "100%",
          alignItems: 'center'
        },
        Title: {
          textAlign: 'center',
          fontSize: 20
        },
        buttonStyle: {
          borderColor: 'white',
          width: 120,
          height: 35,
          borderRadius: 15,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
