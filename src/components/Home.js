import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider as PaperProvider, Button} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation';

export default class Home extends React.Component {

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Home Screen</Text>
          <Button mode="outlined" onPress={() => this.props.navigation.navigate('Details')}>
            Details
          </Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
