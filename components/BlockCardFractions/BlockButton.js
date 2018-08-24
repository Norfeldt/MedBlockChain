import React, { PureComponent } from 'react'
import { TouchableOpacity, StyleSheet, Platform } from 'react-native'
import Text from '../basic/Text'
import Colors, { getHashColors } from '../../constants/Colors'

export default class BlockButton extends PureComponent {
  render() {
    const { title, value, onPress, style } = this.props
    const { backgroundColor, color } = value.match(/^([a-zA-Z0-9]{15,})$/)
      ? getHashColors(value)
      : { backgroundColor: Colors.timestampBG, color: Colors.dark }

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor,
          },
          style,
        ]}
        onPress={() => onPress(title)}
      >
        <Text type="p" style={{ fontSize: 14, color }}>
          {title}
        </Text>
        <Text type="code" style={{ color }}>{`${value.slice(0, 10)}...`}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.headerLine,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 7,
    padding: 5,
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
