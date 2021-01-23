import React, { useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import NewQuiz from './Components/NewQuiz';
import * as Sentry from '@sentry/react';
import Database from './Ultils/Database';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

Sentry.init({
  dsn: 'https://c462fd6f839644b690ada8565b5588f7@o394893.ingest.sentry.io/5598241',
});

//Sentry.captureException("hello there");

const Stack = createStackNavigator();

export default function App() {
  useEffect(async () => {
    while (true) {
      const DB = new Database({ type: 'CouchDB' }),
        files_db = await DB.connect({ host: 'files' });
      if (files_db !== null) {
//        alert(JSON.stringify(files_db));
        break;
      } else {
        throw new Error("Can't connect to the database")
      }
    }
  });
  return (
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="NewQuiz" component={NewQuiz} options={{ title: 'Add a new quiz' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Sentry.ErrorBoundary>
  );
}