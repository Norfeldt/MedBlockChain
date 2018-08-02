//import liraries
import React, { PureComponent } from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import Colors from '../../constants/Colors'

// create a component
export default class Card extends PureComponent {
  render() {
    return <View style={styles.card}>{this.props.children}</View>
  }
}

// define your styles
const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.headerLine,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0.3,
        },
      },
      android: {
        elevation: 1,
        position: 'relative',
      },
    }),
  },
})
