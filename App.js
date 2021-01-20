import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: 'https://c462fd6f839644b690ada8565b5588f7@o394893.ingest.sentry.io/5598241',
});

//Sentry.captureException("hello there");

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