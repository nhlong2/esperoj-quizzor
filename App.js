import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as Sentry from '@sentry/react';
import * as PouchDB from 'pouchdb';


Sentry.init({
  dsn: 'https://c462fd6f839644b690ada8565b5588f7@o394893.ingest.sentry.io/5598241',
});

//Sentry.captureException("hello there");
async function get_access_token(api_key) {
  var url = 'https://iam.cloud.ibm.com/identity/token';
  var data = `{
                "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
                "response_type": "cloud_iam",
                "apikey": ${api_key}
            }`;
  let response = await fetch(
    url + '?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=' + api_key,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      //body: data // body data type
    }
  );
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
    sentry.captureException(err)
      console.log(err);
    });
  return db;
}

(async () => {
  while (true) {
    const api_key = prompt('what is your api key'),
      secret = prompt('what is your secret'),
      access_token = get_access_token(api_key);
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

export default function App() {
  return (
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
      <View style={styles.container}>
        <Text>Text</Text>
        <Button
          onPress={onPress}
          title="Button"
          color="green"
          accessibilityLabel="Learn more about this green button"
        />
      </View>
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