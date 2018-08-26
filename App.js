import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import AppNavigator from './navigation/AppNavigator'
import { ContextProvider } from './Context'
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <ContextProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </ContextProvider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([require('./assets/images/<FileName>.png')]),
      Font.loadAsync({
        Aldrich: require('./assets/fonts/Aldrich-Regular.ttf'),
        NovaMono: require('./assets/fonts/NovaMono.ttf'),
        q180624: require('./assets/fonts/q180624.ttf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
