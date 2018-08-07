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
  import { Icon } from 'react-native-elements';
  import { LinearGradient } from 'expo';

  export default class GridScreen extends React.Component {

    constructor(){
      super();
      this.state = {
        reasons: [],
        userid: '',
        value: '',
        emotions: []
      }
    }

    componentDidMount(){
      let userInfo = this.props.navigation.getParam('userInfo');
      this.setState({
        userid: userInfo.userid,
        value: userInfo.value,
        emotions: userInfo.emotions
      });
    }

    select(caption) {
      let arr = this.state.reasons.slice()
      arr.push(caption)
      this.setState({
        reasons: arr
      });
    }

    next(){
      let userInfo = {
        userid: this.state.userid,
        reasons: this.state.reasons,
        value: this.state.value,
        emotions: this.state.emotions
      }
      this.props.navigation.navigate('Journal', {userInfo: userInfo})
    }


    render(){
      return(

        <LinearGradient style={{display: 'flex', flex:1}} colors={["#b3e0ff", "#00a3cc"]} >


            <View style={{flex:1, marginTop: "10%"}}>
              <Text style={styles.titleText}>What affected you today?</Text>
            </View>


            <View style={{flex:3}}>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <FullIcon iconName="md-bookmarks" caption="Education" select={this.select.bind(this)}/>
                <FullIcon iconName="ios-briefcase" caption="Work" select={this.select.bind(this)}/>
                <FullIcon iconName="ios-home" caption="Family" select={this.select.bind(this)}/>
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <FullIcon iconName="md-heart" caption="Relationship" select={this.select.bind(this)}/>
                <FullIcon iconName="ios-restaurant" caption="Food" select={this.select.bind(this)}/>
                <FullIcon iconName="md-car" caption="Travel" select={this.select.bind(this)}/>
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <FullIcon iconName="ios-contacts" caption="Friends" select={this.select.bind(this)}/>
                <FullIcon iconName="md-bicycle" caption="Exercise" select={this.select.bind(this)}/>
                <FullIcon iconName="ios-partly-sunny" caption="Weather" select={this.select.bind(this)}/>
              </View>
            </View>


            <View style={{flex:1, alignItems: 'center'}}>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.next()}>
                <Text style={styles.nextText}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>

        </LinearGradient>
      )
    }


  }

  export class FullIcon extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: false
      }
    }

    render(){
      return(
        <TouchableOpacity onPress={() => this.props.select(this.props.caption)} style={styles.iconStyle}>
          <Icon color='white' type='ionicon' name={this.props.iconName} size={50} />
          <Text style={{fontSize: 15, color: 'white'}}>{this.props.caption}</Text>
        </TouchableOpacity>
      )
    }
  }

  const styles = StyleSheet.create({
    iconStyle: {
      justifyContent: "center",
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'white',
      width: "33.33%",
      paddingBottom: "2%"
    },
    nextButton: {
      alignItems: "center",
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'white',
      width: 120,
      height: 35,
      borderRadius: 15

    },
    titleText:{
      textAlign:"center",
      justifyContent: 'center',
      fontSize: 30,
      color:"white",
      fontFamily:"Cochin"
    },
    nextText:{
      fontSize: 20,
      fontFamily: 'Cochin',
      textAlign:"center",
      justifyContent: 'center',
      fontSize: 25,
      color:"white",
      fontFamily:"Cochin"
    }
  })
