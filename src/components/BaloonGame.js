import React from 'react';
import {Text, View, StyleSheet, Dimensions, Animated, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {black} from 'react-native-paper/src/styles/colors';


let styles =
    {
      button: {
        position: "absolute",
        height: 100,
        width: 100
      }
    };


export default class BaloonGame extends React.Component {

  render() {
    return (
        <View>
          <TopAnimation style={styles.button}/>
          <TopAnimation style={styles.button}/>
          <TopAnimation style={styles.button}/>
          <TopAnimation style={styles.button}/>
          <TopAnimation style={styles.button}/>
        </View>
    );
  }
}

class TopAnimation extends React.Component {
  state = {
    sleft: new Animated.Value(10),
    topAnim: new Animated.Value(Dimensions.get("window").height),
    baloonColor: "green"
  };

  //this doesnt work atm
  GenerateStartPosition() {
    return Dimensions.get("window").height;
  }

  GenerateLeft() {
    return Math.floor(Math.random() * Dimensions.get("window").width) - 50;
  }

  GenerateColor() {
    /*
    * Returns random color
    */
    let randomnum = Math.floor(Math.random() * 5);
    return ['red', 'blue', 'yellow', 'orange', 'green'][randomnum];
  }

  componentDidMount() {
    this.RunAnimation();
  }

  pressHandler() {
    this.RunAnimation();
  }

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

