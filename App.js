import React, { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import AppNavigator from './navigation/AppNavigator'
import { ContextProvider } from './Context'

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => setLoadingComplete(true)}
      />
    )
  } else {
    return (
      <ContextProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <AppNavigator />
        </View>
      </ContextProvider>
    )
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require('./assets/images/knob.png')]),
    Font.loadAsync({
      'Aldrich': require('./assets/fonts/Aldrich-Regular.ttf'),
      'NovaMono': require('./assets/fonts/NovaMono.ttf'),
      'fonticons': require('./assets/fonts/fonticons.ttf'),
    }),
  ])
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
  console.warn(error)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
