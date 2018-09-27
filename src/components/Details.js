import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';

export default class Details extends React.Component {
  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Details Screen</Text>
        </View>
    );
  }
}