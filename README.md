# it2810-webutvikling-h18-prosjekt-3-39

# Introduksjon - Todont Appen

I en verden hvor generasjon prestasjon har tatt over har vi satt oss som mål å
være en motpol nettopp dette. Vår app tråkker hardt på gasspedalen og skal få
brukeren til å roe ned og bevege seg mindre. For å gjøre dette kan brukeren
igjennom appen lage en liste over ting en ikke burde gjøre, som skolearbeid osv.
Den har og en skritteller slik at en ikke går for langt, samt ett ytterst
engasjerende ballongspill.

Vi valgte å dele koden inn i følgende komponenter:
 * BaloonGame.js
 * DontDos.js
 * Home.js
 * NewDontDo.js
 
Da vi føler at dettevar det mest ryddige oppsettet. Her kunne vi kombinert
`DontDos.js` og `ǸewDontDo.js`, men gruppen følte at det var mer ryddig med en
ny side fremmfor et modalvindu eller lignende.

Tilsvarende 

# Biblioteker vi har tatt i bruk:

### Paper 

Paper er et bibliotek med komponenter som gjør design av apps enkelt, raskt og
gjør det mye lettere å få en app til å se estetisk pen ut enn hvis en skulle
brukt lang tid på å style alle komponentene selv. Det er material design for
react native. Dog førte dette biblioteket til noen problemer når det kom til
testing.

For eksempel så fungerer paper komponentene helt fint i `newDontDo.js` men ikke i 
`DontDos.js`. Merk at det krasjet bare når vi skulle kjøre testene.

[Paper (github)](https://github.com/callstack/react-native-paper)

# Testing

## Jest

I testingen brukte vi snappshot testing, dette betyr i utgangspunktet at vi tar
ett stillbildet av tilstanden til appen og sammenlikner med det vi ønsker skulle
skje.

[Jest](https://jestjs.io/)

### Kilder:

[AsyncStorage Mock](https://stackoverflow.com/questions/40952566/how-to-test-async-storage-with-jest)
[Pedometer](https://docs.expo.io/versions/latest/sdk/pedometer)
