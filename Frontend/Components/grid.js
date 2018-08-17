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
        emotions: [],
        selected: false,
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
        reasons: arr,
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

        <LinearGradient style={{display: 'flex', flex:1}} colors={["#CAE2D0", "#CAE2D0"]} >

          <View style={{flex:1, marginTop: "10%", marginBottom: "5%"}}>
            <Text style={styles.titleText}>What affected you </Text>
            <Text style={styles.titleText}> today?</Text>
          </View>


          <View style={{flex:3}}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <FullIcon iconName="md-bookmarks" caption="Education" select={this.select.bind(this)} selected={this.state.selected} />
              <FullIcon iconName="ios-briefcase" caption="Work" select={this.select.bind(this)} selected={this.state.selected} />
              <FullIcon iconName="ios-home" caption="Family" select={this.select.bind(this)} selected={this.state.selected} />
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <FullIcon iconName="md-heart" caption="Relationship" select={this.select.bind(this)} selected={this.state.selected} />
              <FullIcon iconName="ios-restaurant" caption="Food" select={this.select.bind(this)} selected={this.state.selected} />
              <FullIcon iconName="md-car" caption="Travel" select={this.select.bind(this)} selected={this.state.selected} />
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <FullIcon iconName="ios-contacts" caption="Friends" select={this.select.bind(this)} selected={this.state.selected} />
              <FullIcon iconName="md-bicycle" caption="Exercise" select={this.select.bind(this)} selected={this.state.selected} />
              <FullIcon iconName="ios-partly-sunny" caption="Weather" select={this.select.bind(this)} selected={this.state.selected} />
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
      this.state={
        selected: false
      }
    }

    render(){
      return(
        <TouchableOpacity onPress={() => {
          this.setState({selected: true})
          return this.props.select(this.props.caption)
        }} style={this.state.selected ? styles.iconStyleT : styles.iconStyleF}>
        <Icon color='gray' type='ionicon' name={this.props.iconName} size={50} />
        <Text style={{fontSize: 15, color: 'gray'}}>{this.props.caption}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  iconStyleT: {
    justifyContent: "center",
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#CAE2D0',
    backgroundColor: '#C0C0C0',
    width: "33.33%",
    paddingBottom: "2%"
  },
  iconStyleF: {
    justifyContent: "center",
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#CAE2D0',
    backgroundColor: '#e9f3ec',
    width: "33.33%",
    paddingBottom: "2%"
  },
  nextButton: {
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#e9f3ec',
    width: 120,
    height: 50,
    borderRadius: 15
  },
  titleText:{
    textAlign:"center",
    justifyContent: 'center',
    fontSize: 40,
    color:"#505a53",
    fontFamily:"Cochin"
  },
  nextText:{
    fontSize: 25,
    fontFamily: 'Cochin',
    textAlign:"center",
    justifyContent: 'center',
    fontSize: 25,
    color:"#505a53",
    fontFamily:"Cochin"
  }
})
