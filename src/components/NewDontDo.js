import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, AsyncStorage} from 'react-native';
// import {Button, TextInput} from 'react-native-paper';
import {Button} from 'react-native-elements';


const styles = StyleSheet.create({
  // Styles for denne classen
  submitButton: {
    alignSelf: 'center',
    width: '50%',
    borderRadius: 50,
    margin: 20
  },
  view: {
    height: '100%'
  }
});

// Brukes ved onPress til å dismisse keyboard
const dismissKeyboard = require('dismissKeyboard');

export default class NewDontDo extends React.Component {

  state = {
    title: '',
    content: '',
    tasks: {}
  };

  async componentDidMount() {
    // Hvis det har blitt lagt til en dont do tidligere så henter vi IDen dens
    try {
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks) { // Sjekker om det finnes noen tasks, hvis ja så setter vi task state
        this.setState({tasks: JSON.parse(tasks)});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          {/* When clicking the screen (not  */}
          <View style={styles.view}>
            {/*<TextInput
                label='Tittel'
                value={this.state.title}
                onChangeText={title => this.setState({title})}
                mode='outlined'
            />
            <TextInput
                label='Beskrivelse'
                value={this.state.content
                onChangeText={content => this.setState({content})}
                mode='outlined'
                multiline
            />*/}
            <Button disabled={!(this.state.title.length > 0 && this.state.content.length > 0)}
                    style={styles.submitButton} title={'Hei'} onPress={() => this.saveNewDontDo()}/>
          </View>
        </TouchableWithoutFeedback>
    );
  }

  constructNewDontDo(prevTasks) {
    // lager en ny task state og setter state til det, og asyncstorage setitem tasks til det
    const newTaskNumber = Object.keys(prevTasks).length;
    let newTaskState = this.state.tasks;
    newTaskState[`${newTaskNumber}`] = {
      'title': this.state.title,
      'content': this.state.content,
      'done': false
    };
    console.log(newTaskState);
    return newTaskState;
  }

  async saveNewDontDo() {
    /*
     * Bruker AsyncStorage til å legge til en ny Dont Do
     */
    try {
      const newDontDo = this.constructNewDontDo(this.state.tasks);
      this.setState({tasks: newDontDo});
      await AsyncStorage.setItem('tasks', JSON.stringify({
          ...newDontDo
      }));

    } catch (e) {
      console.error(e);
    } finally {
      // navigerer tilbake til Dont Dos
      /*
       * Popper denne instansen av NewDontDo for at appen ikke skal huske hva som du har skrevet her etter at det er
       * lagra (For å slippe å viske bort neste gang du skal legge til en ny to dont)
       */
      this.props.navigation.dismiss();
      this.props.navigation.popToTop();
      this.props.navigation.push('DontDos');
      /*
       * Pusher DontDos for å kalle componentDidMount i DontDos
       * Ellers oppdaterer ikke listen med to donts seg
       */
      // this.props.navigation.push('DontDos');
    }
  }
  returnsTrue() {
    return true;
  }
}
