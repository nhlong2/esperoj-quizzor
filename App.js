import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Sentry from '@sentry/react';
import PouchDB from 'pouchdb';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

Sentry.init({
  dsn: 'https://c462fd6f839644b690ada8565b5588f7@o394893.ingest.sentry.io/5598241',
});

//Sentry.captureException("hello there");
async function get_access_token(api_key) {
  var url = 'https://auth.nhlong.workers.dev/';
  let response = await fetch(url, {
    method: 'POST',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      api_key: `${api_key}`,
    },
  });
  if (response.status == 200) {
    return (await response.json()).access_token;
  } else {
    return null;
  }
}

async function connect_database(url, headers, access_token) {
  const db = new PouchDB(url, {
    fetch: function (uri, opts) {
      for (const header in headers) {
        opts.headers.set(header[0], header[1]);
      }
      opts.credentials = 'omit';
      opts.headers.set('Accept', '*/*');
      opts.headers.set('Accept-Encoding', 'deflate, gzip');
      //      opts.headers.set('Accept', 'application/json');
      opts.headers.set('Authorization', 'Bearer ' + access_token);
      return PouchDB.fetch(uri, opts).catch((error) => Sentry.captureException(`error at ${uri}`));
    },
  });

  // test script

  db.info()
    .then(function (info) {
      console.log(info);
    })
    .catch((err) => {
      Sentry.captureException(err);
      console.log(err);
    });
  return db;
}

(async () => {
  while (true) {
    const api_key = prompt('what is your api key'),
      secret = prompt('what is your secret'),
      access_token = get_access_token(api_key),
      files_db = await connect_database(
        'https://eq-cloudant.nhlong.workers.dev/files',
        [['api_secret', secret]],
        access_token
      );
    if (files_db !== null) {
      break;
    }
  }
})();

function onPress() {}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Text</Text>
      <Button
        onPress={() => navigation.navigate('New quizzes')}
        title="All quizzes"
        color="green"
        accessibilityLabel="Learn more about this green button"
      />
    </View>
  );
}

function NewQuiz({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Text</Text>
      <Button
        onPress={() => navigation.navigate('New quizzes')}
        title="New quiz"
        color="green"
        accessibilityLabel="Learn more about this green button"
      />
    </View>
  );
}

export default function App() {
  return (
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'Dashboard' }} />
          <Stack.Screen name="NewQuiz" component={NewQuiz}  options={{ title: 'Add a new quiz' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Sentry.ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});