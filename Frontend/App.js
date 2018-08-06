import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from "./Components/login";
import RegisterScreen from "./Components/register";
import SurveyScreen from "./Components/initialSurvey";
import MoodScreen from "./Components/mood";
import GridScreen from "./Components/grid";
import EmotionsScreen from "./Components/emotions";
import JournalScreen from "./Components/journal";
import SuggestionsScreen from "./Components/suggestions";
import HomePageScreen from "./Components/homepage";
import StatsScreen from "./Components/stats";
// import PhysicalActivity from "./Exercises/timer";
// import Funny from "./Exercises/gifs";
// import Gratitude from "./Exercises/gratList";
// import letterSelf from "./Exercises/letterSelf";
// import letterOther from "./Exercises/letterOther";
// import Magnify from "./Exercises/magnify";
// import Call from "./Exercises/call";
// import Music from "./Exercises/music";
// import Shower from "./Exercises/shower";
// import letterAngry from "./Exercises/letterAngry";
// import Breathing from "./Exercises/bubble";
// import Drink from "./Exercises/drink";
// import Grounding from "./Exercises/grounding";
// import Eat from "./Exercises/eat";


import { StackNavigator } from 'react-navigation';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      name: "",
      email: "",
      phone: ""
    }
  }


  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}


export default StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Survey: {
    screen: SurveyScreen
  },
  Mood: {
    screen: MoodScreen
  },
  Grid: {
    screen: GridScreen
  },
  Emotions: {
    screen: EmotionsScreen
  },
  Journal: {
    screen: JournalScreen
  },
  Suggestions: {
    screen: SuggestionsScreen
  },
  HomePage: {
    screen: HomePageScreen
  },
  Stats: {
    screen: StatsScreen
  }
  // PhysicalActivity: {
  //   screen: PhysicalActivity
  // },
  // Funny: {
  //   screen: Funny
  // },
  // Gratitude: {
  //   screen: Gratitude
  // },
  // letterSelf: {
  //   screen: letterSelf
  // },
  // letterOther: {
  //   screen: letterOther
  // },
  // Magnify: {
  //   screen: Magnify
  // },
  // Call: {
  //   screen: Call
  // },
  // Music: {
  //   screen: Music
  // },
  // Shower: {
  //   screen: Shower
  // },
  // letterAngry: {
  //   screen: letterAngry
  // },
  // Breathing: {
  //   screen: Breathing
  // },
  // Drink: {
  //   screen: Drink
  // },
  // Grounding: {
  //   screen: Grounding
  // },
  // Eat: {
  //   screen: Eat
  // },
}, {initialRouteName: 'Login'});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
