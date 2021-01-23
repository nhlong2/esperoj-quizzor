import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';



function NewQuiz({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Text</Text>
      <Button
        onPress={() => navigation.navigate('Dashboard')}
        title="Dashboard"
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
export default NewQuiz;