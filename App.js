import React, { useEffect } from 'react'
import { StyleSheet, View, LogBox } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

import AppNavigator from './navigation/AppNavigator'
import { ContextProvider } from './Context'
import Colors from './constants/Colors'

export default function App(props) {
  let [fontsLoaded] = useFonts({
    Aldrich_400Regular: require('./assets/fonts/Aldrich-Regular.ttf'),
    NovaMono_400Regular: require('./assets/fonts/NovaMono.ttf'),
    fonticons: require('./assets/fonts/fonticons.ttf'),
  })

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
  }, [])

  if (fontsLoaded) {
    return (
      <SafeAreaProvider style={styles.container}>
        <UnsafeTopArea />
        <ContextProvider>
          <AppNavigator />
        </ContextProvider>
      </SafeAreaProvider>
    )
  } else {
    return <AppLoading />
  }
}

function UnsafeTopArea(props) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        backgroundColor: Colors.passiveBG,
        paddingTop: insets.top,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
