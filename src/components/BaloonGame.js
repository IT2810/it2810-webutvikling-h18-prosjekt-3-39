import React from 'react';
import {Text, View, StyleSheet, Dimensions, Animated,TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {black} from 'react-native-paper/src/styles/colors';


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
    return Dimensions.get("window").height
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
 
  pressHandler(){
    this.RunAnimation()
  }

  RunAnimation() {
    let newLeft = this.GenerateLeft()
    let newColor = this.GenerateCollor()
    this.setState({sleft: newLeft})
    this.setState({baloonColor: newColor})
    this.state.topAnim.setValue(this.GenerateStartPosition())
    Animated.loop(
    Animated.timing(
      this.state.topAnim,
      {toValue: 0,
      duration: 10000,
    })).start()
  }

  render() {
    return(
    <Animated.View style = {{...this.props.style, top: this.state.topAnim, left: this.state.sleft}}>
      {this.props.children}
      <TouchableOpacity
        style = {{... 
          this.props.style,
        }} 
        onPress={() => {this.pressHandler();}} 
        > 
        <View 
        style = {{... 
          this.props.style, 
          backgroundColor: this.GenerateCollor(),
          borderRadius: 50
          
        }} 
        >
        </View>
      </TouchableOpacity>
     </Animated.View>
    );

  }
}

