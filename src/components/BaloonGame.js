import React from 'react';
import {Text, View, StyleSheet, Dimensions, Animated,TouchableOpacity,} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Button} from "react-native-paper"
import { black } from 'react-native-paper/src/styles/colors';
import Canvas from "react-native-canvas"

let styles = 
{
  button: {
    position: "absolute",
    height: 100,
    width:100,
    backgroundColor: "black",
    left: 100,
  }
};


export default class BaloonGame extends React.Component {
  
  render(){
    return(
    <View>
      <TopAnimation style={styles.button}>
      </TopAnimation>
    </View>
    )
  }
}

class TopAnimation extends React.Component{
  state = {
    topAnim: new Animated.Value(Dimensions.get("window").height)
  }

  componentDidMount(){
    Animated.timing(
      this.state.topAnim,
      {
        toValue: 0,
        duration: 10000,
      }
    ).start()
  }
 
  handlePress() {
    this.state.setValue({
      topAnim: Dimensions.get("window").height
    });
  }

  render() {
    let { topAnim } = this.state;
    return(
    <Animated.View style = {{ ...this.props.style, top: topAnim,}}>
      {this.props.children}
     </Animated.View>
    );

  }
}






    // TODO: Får feilmeldinger med GCCAnvas
   /*
    return (
      <View>
        <Canvas ref={this.handleCanvas}/>
      </View>
    );
  }
*/

 /*
  handleCanvas = (canvas) => {
    canvas.width = Dimensions.get('window').width;
    canvas.height = Dimensions.get('window').height;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
   
  }
   
}
*/
 
