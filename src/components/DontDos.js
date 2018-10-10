import React from 'react';
import {Text, View, AsyncStorage, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Checkbox} from 'react-native-paper';


const styles = {
  card: {
    flexDirection: 'row'
  }
};

export default class DontDos extends React.Component {

  state = {
    donts: [],
    count: 0
  };

  async componentDidMount() {
    /*
     * Henter inn antall To Don'ts
     * Henter inn alle Dont Dos og legger i state
     * Returnerer ingenting (exiter ut av funksjonen) hvis det ikke finnes noen toDonts (count < 1)
     */
    try {
      const count = await AsyncStorage.getItem('lastDontID');
      if (count) {
        this.setState({count: parseInt(count)});
      }
    } catch (e) {
      console.error(e);
    }

    if (this.state.count < 1) return;

    // Lager en liste med doDont sine keys. Den nyeste todonten kommer på toppen av listen
    let keyList = [];
    for (let i = this.state.count; i > 0; i--) {
      keyList.push(`dont${i}`);
    }
    // Henter inn alle ToDonts ut i fra keysene i keyList
    try {
      // Multiget henter alle elementer i asyncstorage med en liste
      await AsyncStorage.multiGet(keyList).then(res => {
        let dontsAsJson = [];
        // lager en liste med json (må parse fra string først)
        res.forEach(e => {
          dontsAsJson.push(JSON.parse(e[1]));
        });
        // Setter state
        this.setState({donts: dontsAsJson}, () => console.log(this.state));
      });
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

  createToDontCards() {
    /*
     * Lager komponent av alle toDonts. Putter dette inn i render
     */
    let cards = [];
    this.state.donts.forEach((e, i) => {
      /*
      * Sjekker om toDonten er null eller undefined just in case
      * (Det var noen som ble null da jeg lagde dette fordi jeg ikke parsa state til int når man laster
      * opp lastDontID med asyncstorage, men det er fiksa nå, så skal ikke være et problem det, men greit å ha
      * med en sjekk uansett tenker jeg. SKader ikke iallefall.
      */
      if (e !== null && e !== undefined) {
        cards.push(
            <Card key={i} style={styles.card}>
              <Card.Content>
                <Title>{e.title}</Title>
                <Paragraph>{e.content}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Checkbox
                    status={e.done}
                />
                <Text>Ferdig</Text>
              </Card.Actions>
            </Card>
        );
      }
    });
    return cards;
  }
}