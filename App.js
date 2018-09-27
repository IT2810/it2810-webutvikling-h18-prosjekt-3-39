import React from 'react';
import {View, Text} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createStackNavigator} from 'react-navigation';

import Home from './src/components/Home';
import Details from './src/components/Details';

const RootStack = createStackNavigator(
    {
      Home: Home,
      Details: Details
    },
    {
      initialRouteName: 'Home'
    }
);

export default class App extends React.Component {

  render() {
    return (
        <PaperProvider>
          <RootStack/>
        </PaperProvider>
    );
  }
}
