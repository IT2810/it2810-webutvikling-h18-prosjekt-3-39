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
 * PedometerSensor.js
 
Da vi føler at dettevar det mest ryddige oppsettet. Her kunne vi kombinert
`DontDos.js` og `ǸewDontDo.js`, men gruppen følte at det var mer ryddig med en
ny side fremmfor et modalvindu eller lignende.

Tilsvarende 

### DontDos.js
To donts viser alle oppgavene vi ikke ønsker å få utført. Her henter vi 
alle taksa laget i newDontDo.js fra async storage og viser til brukeren 
gjennom en rekke komponenter fra Paper bibloteket. Dette bibloteket står 
beskrevet senere i filen. Det er også mulig å endre på staten til oppgavene
fra ikke gjort til gjort og omvendt. 

### NewDontDo.js
Her lager vi nye tasks, og sender dem til async storage for bruk i dontdos.js
For å få dette til å fungere med jest valgte vi å bruke react-native-elements
her i stede for paper. 

### Baloon.js
Ballong spillet er essensielt en implementasjon av react-native sin animated biblotek.
Med dette bibloteket er det mulig å endre på verdier i porps over tid på en
enkel måte. I vår implementasjon bruker vi dette til å flytte balongene
oppover skjermen. For lyd brukte vi expos innebygde audio bibliotek, det 
er et enkelt men noe begreset biblotek som gjorde jobben. 

### PedometerSensor.js
Dette er en skritteller som sier ifra når du har gått for langt. Vi hentet 
mye av koden til skrittelleren på nettet, da det fantes enkle iplementasjoner som
løste proplemet på nettet. Programmet henter stepcout fra enhetens innebyggde 
pedometer gjennom pedometer komponenten til expo. Vi definerer et interval
og viser hvor mange skritt som er gått i det intervallet.  vi skulle gjerne 
implementert mer funksjonalitet her, som maks skritt og en alarm som 
gikk av når du nådde en terskel. Vi ble litt for opplukt i ballongspillet 
til at vi fik tid. 

[Pedometer kode](https://docs.expo.io/versions/latest/sdk/pedometer)

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


# Teknologi

### Animate
Animated er et av react-native sine bibloteker. Det kan brukes til å gi
forskjellige komponenter enkle annimasjoner. Dette er nyttig til alt fra 
å gi brukeren din feedback på at noe skjer når du trykker på en knapp, til
å lage fancy transitions når du beveger deg fra en side til en annen. Eller 
så kan du kaste alle de vanlige bruksområdene ut av vindue og desinge et
enkelt spill ved å bevege komponenter rundt på skjermen. 

Metodene i bibloteket fungerer sån at du kan lage verdier i for eksempel
en state variabel ved å kalle new Animated.Value(*startverdi*), for 
derreter å deffinere hvordan denne verdien skal endre seg. I vårt programm
endrer vi en variabel over tid. Den startet som lengden av skjermen og går til
0. Dette brukes til å endre style propsen til objektet vi animerer slik at 
det beveger seg over skjermen. Dette gjøres med Animated.timing() funksjonen
som tar inn en state med Animated.Value variabler, ett sluttpungt 
for den animerte verdien og tiden det skal ta i milliskeunder. vi 
bruker .start() for å starte animasjonen og legger alt i en Animate.loop()
som essensiellt setter annimasjonen på repeat. 

### Audio
Audiobibloteket til expo er en enkel men noe begrenset måte å håndtere lyd på.
Den lar deg opprette Sound objekter som du kan laste lydklipp inn i med 
loadAsynk() funksjonen. derretter er det en rekke måter å manipulere lyden
men den eneste vi trengte var play() som spiller av lydklippet til det er ferdig
eller pause() funksjonen blir kallt. 

### Pedometer
De fleste moderne telefoner kommer med et innebygget pedometer som kan telle skritt. Expo sit pedometer bibliotek lar deg hente informasjon fra dette pedometere og presentere det for brukeren. 

når du har sjekket at skritelleren er tilgjengelig på telefonen med isAvailableAsync() funcksjonen kan du hente antall skritt i et intervall med getStepcountAsync() funksjonen. du kan også oppdatere anltall skritt løpende ved å bruke watchStepCount() funksjonen. 
