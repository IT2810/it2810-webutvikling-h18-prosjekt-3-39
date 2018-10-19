import React from 'react';
import {Text, View, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {black} from 'react-native-paper/src/styles/colors';
import {Audio} from "expo"

//brukt for å style objektene som beveger seg i spillet
let styles =
    {
      button: {
        position: "absolute",
        height: 100,
        width: 100
      }
    };

export default class BaloonGame extends React.Component {
  // This generates 5 baloons, and sets the background collor of the whole screen to black
  render() {
    return (
        <View style = {{backgroundColor:"black", height: Dimensions.get("window").height}}>
          <Baloon style={styles.button}/>
          <Baloon style={styles.button}/>
          <Baloon style={styles.button}/>
          <Baloon style={styles.button}/>
          <Baloon style={styles.button}/>
        </View>
    );
  }
}

class Baloon extends React.Component {
  state = {
    sleft: 0,
    topAnim: new Animated.Value(this.GenerateStartPosition()),
    baloonColor: ""
  };
  // return the hegiht of the screen.
  GenerateStartPosition() {
    return Dimensions.get("window").height;
  }
  // Generates a random value based on the screen widht
  GenerateLeft() {
    return Math.floor(Math.random() * Dimensions.get("window").width) - 50;
  }
  // chooses a random element form the array passed into it.
  ChooseRandom(array){
    return array[Math.floor(Math.random() * array.length)];
  }
  // returns a collor srting for styling baloons
  GenerateColor() {
    let baloonColors = ['red', 'blue', 'yellow', 'orange', 'green', "purple"] 
    return this.ChooseRandom(baloonColors);}
  
  // returns a string corresponding to a soundfile in src folder.
  GenerateSound(){
    let soundOption = [
      require("../sound/pop1.mp3"),
      require("../sound/pop2.mp3"),
      require("../sound/pop3.mp3")
    ]
    return this.ChooseRandom(soundOption);
  }
  // triggers when the baloon mounts. 
  componentDidMount() {
    this.RunAnimation();
  }
  // when a baloon i spressed this function i called
  async pressHandler() {
    this.RunAnimation();
    pop = new Audio.Sound()
    let soundloc = this.GenerateSound();
    try {
      await pop.loadAsync(this.GenerateSound());
      await pop.playAsync();
      await pop.setPositionAsync(0);
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }
  //Resets and runs the animation. 
  RunAnimation() {
    let newLeft = this.GenerateLeft();
    let newColor = this.GenerateColor();
    this.setState({sleft: newLeft});
    this.setState({baloonColor: newColor});
    this.state.topAnim.setValue(this.GenerateStartPosition());
    Animated.loop(
        Animated.timing(
            this.state.topAnim,
            {
              toValue: 0,
              duration: 10000
            })).start();
  }

  render() {
    return (
        //Animated.View er et view hvor du kan endre props over tid.
        //tochable opacities brukes for å lage en balongformet (rund) knapp.
        <Animated.View style={{...this.props.style, top: this.state.topAnim, left: this.state.sleft}}>
          {this.props.children}
          <TouchableOpacity
          style={
            this.props.style
          }
              onPress={() => {
                this.pressHandler();
              }}
          >
            <View
                style={{
                  ...this.props.style,
                  backgroundColor: this.GenerateColor(),
                  borderRadius: 50
                }}
            >
            </View>
          </TouchableOpacity>
        </Animated.View>
    );

  }
}

