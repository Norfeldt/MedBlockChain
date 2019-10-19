//import liraries
import Constants from 'expo-constants';
import React, { PureComponent } from 'react'
import { Linking, Platform, StyleSheet, View } from 'react-native'
import Colors from '../constants/Colors'
import Button from './basic/Button'

class SourceCodeLink extends PureComponent {
  render() {
    const { title, style, textStyle } = this.props

    return (
      <View style={[styles.container, style]}>
        {Platform.OS === 'ios' && (
          <View style={{ height: Constants.statusBarHeight }} />
        )}
        <Button
          title="Source Code"
          onPress={() =>
            Linking.openURL('https://github.com/Norfeldt/MedBlockChain').catch(
              err => console.error('An error occurred', err)
            )
          }
          buttonColor={Colors.scrollBG}
          iconName="github"
          textColor={Colors.passive}
          style={{
            borderColor: Colors.passive,
            borderWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'black',
  },
})

//make this component available to the app
export default SourceCodeLink
