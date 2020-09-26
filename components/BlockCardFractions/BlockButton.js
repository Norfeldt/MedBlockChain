import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Platform } from 'react-native'
import Text from '../basic/Text'
import Colors, { getHashColors } from '../../constants/Colors'

export default function BlockButton(props) {
/**
  state = {
    value: false,
  }
**/
  const [ stateValue, setValue ] = useState(false);

  //render() {
    const { title, value, onPress, colorize = true, style } = props
    const { backgroundColor, color } =
      (colorize || stateValue) && value.match(/^([a-zA-Z0-9]{15,})$/)
        ? getHashColors(value)
        : { backgroundColor: Colors.passiveBG, color: Colors.dark }

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor,
          },
          style,
        ]}
        onPress={() => {
          onPress(title)
          setValue(true)
         // this.setState({ value: true }) // gonna let it keep the color - even when closing the info
        }}
      >
        <Text type="p" style={{ fontSize: 14, color }}>
          {title}
        </Text>
        <Text type="code" style={{ color }}>{`${value.slice(0, 10)}...`}</Text>
      </TouchableOpacity>
    )
 // }
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
