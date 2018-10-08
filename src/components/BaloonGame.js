import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { black } from 'react-native-paper/src/styles/colors';

export default class BaloonGame extends React.Component {
  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>BaloonGame</Text>
          <GCanvas style={styles.canvas} ref="can">  </GCanvas> 
          <canvas style={styles.canvas} ref="can"> </canvas>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
  canvas:{
    width: "100%",
    heigt: "100%",
  }
});