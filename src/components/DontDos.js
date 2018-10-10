import React from 'react';
import {Text, View, AsyncStorage, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Checkbox} from 'react-native-paper';
import Hr from 'react-native-hr-component';


const styles = {
  card: {
    flexDirection: 'row'
  }
};

export default class DontDos extends React.Component {

  state = {
    donts: [],
    count: 0,
    tasks: {}
  };

  async componentDidMount() {
    /*
     * Henter inn antall To Don'ts
     * Henter inn alle Dont Dos og legger i state
     * Returnerer ingenting (exiter ut av funksjonen) hvis det ikke finnes noen toDonts (count < 1)
     */
    try {
      this.setState({tasks: JSON.parse(await AsyncStorage.getItem('tasks'))});
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
        <ScrollView>
          {
            this.createToDontCards()
          }
        </ScrollView>
    );
  }

  async onCheckboxPress(e) {
    /*
     * Lag en ny state og sett nr i (den vi sendte inn) til motsatt verdien av det den var før
     * og så setstate med denne verdien. Dette for å oppdatere deler av state sånn at checkboxen blir checked
     */
    let newTaskState = this.state.tasks;
    newTaskState[e].done = !this.state.tasks[e].done;
    this.setState({tasks: newTaskState});
    await AsyncStorage.setItem('tasks', JSON.stringify(newTaskState));
  }

  createToDontCards() {
    /*
     * Lager komponent av alle toDonts. Putter dette inn i render
     */
    let notDoneTasks = [];

    // Horisontal linje for å separere done og not done cards
    let doneTasks = [<Hr key={'hr'} lineColor='#000' width={5} text='Ferdig'/>];

    Object.keys(this.state.tasks).forEach((e, i) => {
      /*
       * Sjekker om toDonten er null eller undefined just in case
       * (Det var noen som ble null da jeg lagde dette fordi jeg ikke parsa state til int når man laster
       * opp lastDontID med asyncstorage, men det er fiksa nå, så skal ikke være et problem det, men greit å ha
       * med en sjekk uansett tenker jeg. SKader ikke iallefall.
       */
      if (e !== null && e !== undefined) {
        if (!this.state.tasks[e].done) {
          notDoneTasks.push(
              <Card key={i} style={styles.card}>
                <Card.Content>
                  <Title>{this.state.tasks[e].title}</Title>
                  <Paragraph>{this.state.tasks[e].content}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Checkbox
                      status={this.state.tasks[e].done ? 'checked' : 'unchecked'}
                      onPress={() => this.onCheckboxPress(e)}
                  />
                  <Text>Ferdig</Text>
                </Card.Actions>
              </Card>
          );
        } else {
          doneTasks.push(
              <Card key={'notDone' + i} style={styles.card}>
                <Card.Content>
                  <Title>{this.state.tasks[e].title}</Title>
                  <Paragraph>{this.state.tasks[e].content}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Checkbox
                      status={this.state.tasks[e].done ? 'checked' : 'unchecked'}
                      onPress={() => this.onCheckboxPress(e)}
                  />
                  <Text>Ferdig</Text>
                </Card.Actions>
              </Card>
          );
        }
      }
    });
    return notDoneTasks.concat(doneTasks.length > 1 ? doneTasks : []);
  }
}