import React from 'react';
import {Text, View, StyleSheet, Dimensions, Animated,TouchableOpacity,} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Button} from "react-native-paper"
import {black} from 'react-native-paper/src/styles/colors';
import Canvas from "react-native-canvas"

let styles = 
{
  button: {
    position: "absolute",
    height: 100,
    width:100,
  }
};


export default class BaloonGame extends React.Component {

  render(){
    return(
    <View>
      <TopAnimation style={styles.button}>
      </TopAnimation>
      <TopAnimation style={styles.button}>
      </TopAnimation>
      <TopAnimation style={styles.button}>
      </TopAnimation>
      <TopAnimation style={styles.button}>
      </TopAnimation>
      <TopAnimation style={styles.button}>
      </TopAnimation>
    </View>
    )
  }
}

class TopAnimation extends React.Component{
  state = {
    sleft: new Animated.Value(10),
    topAnim: new Animated.Value(Dimensions.get("window").height),
    baloonColor: "green"
  }
  //this doesnt work atm
  GenerateStartPosition(){
    let randomnum = Math.floor(Math.random()*10)
    let screenheight = Dimensions.get("window").height
    return randomnum + screenheight - 500
  }

  GenerateLeft(){
   let randomnum =  Math.floor(Math.random()*Dimensions.get("window").width) -50
   return randomnum
  }

  GenerateCollor(){
    let randomnum = Math.floor(Math.random()*5)
    let col = "black"
    if (randomnum == 0){col = "red"}
    if (randomnum == 1){col = "blue"}
    if (randomnum == 2){col = "yellow"}
    if (randomnum == 3){col = "orange"}
    if (randomnum == 4){col = "green"}
    return col
  }

  componentDidMount(){
    this.RunAnimation()
  }
 
  RunAnimation() {
    this.state.topAnim.setValue(this.GenerateStartPosition())
    this.state.sleft.setValue(this.GenerateLeft())
    let newColor = this.GenerateCollor()
    this.setState({baloonColor: newColor})
    Animated.loop(
    Animated.timing(
      this.state.topAnim,
      {toValue: -100,
      duration: 10000,
    })).start()
  }

  render() {
    return(
    <Animated.View style = {{ ...this.props.style, top: this.state.topAnim, left: this.state.sleft}}>
      {this.props.children}
      <Button style = {{... 
        this.props.style,
        backgroundColor: this.state.baloonColor, 
        borderRadius: 50}} onPress={() => {this.RunAnimation();}} 
        title = "Press"> .
      </Button>
     </Animated.View>
    );

  }
}

