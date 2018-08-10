//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

// create a component
class InfoRow extends PureComponent {
  render() {
    const { style, setting, value } = this.props

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.leftText}>{setting}</Text>

        <Text style={styles.rightText}>{value}</Text>
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftText: {
    flex: 1,
    fontFamily: 'Aldrich',
    color: Colors.tintColor,
    fontWeight: 'bold',
  },
  rightText: {
    flex: 1,
    fontFamily: 'Aldrich',
    textAlign: 'right',
    color: Colors.dark,
  },
})

//make this component available to the app
export default InfoRow
