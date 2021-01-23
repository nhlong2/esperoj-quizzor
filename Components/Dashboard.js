import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Text</Text>
      <Button
        onPress={() => navigation.navigate('NewQuiz')}
        title="New Quiz"
        color="green"
        accessibilityLabel="Learn more about this green button"
      />
    </View>
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
export default Dashboard;