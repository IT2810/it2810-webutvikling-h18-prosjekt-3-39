import React from 'react';
import {createStackNavigator, createDrawerNavigator, DrawerActions} from 'react-navigation';
import {Provider as PaperProvider, Appbar} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, View} from 'react-native';


import Home from './src/components/Home';
import BaloonGame from './src/components/BaloonGame';
import DontDos from './src/components/DontDos';
import NewDontDo from './src/components/NewDontDo';


const styles = StyleSheet.create({
  header: {
    marginLeft: 15,
    marginRight: 15
  },
  root: {
    display: 'flex'
  }
});

const BaloonGameStack = createStackNavigator({
  Baloon: {
    screen: BaloonGame,
    navigationOptions: {
      title: 'Baloon Game',
      headerLeft: <Ionicons style={styles.header} name="md-menu" size={35}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
    }
  }
});

const DontDosStack = createStackNavigator({
  DontDos: {
    screen: DontDos,
    navigationOptions: ({navigation}) => ({
      title: "Don't Do",  // Title to appear in status bar
      headerLeft: <Ionicons style={styles.header} name="md-menu" size={35}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>,
      headerRight: <Ionicons style={styles.header} name="md-add" size={35}
                             onPress={() => navigation.navigate('NewDontDos')}/>
    })
  },
  NewDontDos: {
    screen: NewDontDo,
    navigationOptions: {
      title: "Ny To Don't"
    }
  }
});

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'Home',  // Title to appear in status bar
      headerLeft: <Ionicons style={styles.header} name="md-menu" size={35}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
    })
  }
});

const Root = createDrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: 'Home' // Text shown in left menu
    }
  },
  DontDos: {
    screen: DontDosStack,
    navigationOptions: {
      title: "Don't Do"  // Text shown in left menu
    }
  },
  Baloon: {
    screen: BaloonGameStack,
    navigationOptions: {
      title: 'Baloon Game'
    }
  }
});

export default class App extends React.Component {

  render() {
    /*
     * Render fuction, renders App.
     * */
    return (
        <PaperProvider
            style={styles.root}
        >
          <Root/>
        </PaperProvider>
    );
  }
}