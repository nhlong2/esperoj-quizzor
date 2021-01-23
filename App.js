import React from 'react';
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

(async () => {
  while (true) {
    const DB = new Database({ type: 'CouchDB' }),
      files_db = DB.connect({ host: 'files' });
    if (files_db !== null) {
      break;
    } else {
      alert('cant connect to the database');
    }
  }
})();

const Stack = createStackNavigator();

export default function App() {
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