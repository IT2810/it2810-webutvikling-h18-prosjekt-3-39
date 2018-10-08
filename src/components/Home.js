import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {Button} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';

export default class Home extends React.Component {

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Button mode='outlined' onPress={() => this.props.navigation.navigate('DontDos')}>
            Button
          </Button>
        </View>
    );
  }
}