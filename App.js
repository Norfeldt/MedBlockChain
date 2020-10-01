import React, { useState, useEffect } from 'react'
import { Platform, StatusBar, StyleSheet, View, LogBox } from 'react-native'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'

import AppNavigator from './navigation/AppNavigator'
import { ContextProvider } from './Context'

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
  }, [])

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
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
      fonticons: require('./assets/fonts/fonticons.ttf'),
      Aldrich_400Regular: require('./assets/fonts/Aldrich-Regular.ttf'),
      NovaMono_400Regular: require('./assets/fonts/NovaMono.ttf'),
    }),
  ])
}

function handleLoadingError(error) {
  console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
