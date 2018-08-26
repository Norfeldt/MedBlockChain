import React from 'react'

import Colors from '../../constants/Colors'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'q180624')

export default class TabBarIcon extends React.Component {
  render() {
    const { style } = this.props
    return (
      <Icon
        style={[{ marginBottom: -3 }, style]}
        name={this.props.name}
        size={26}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    )
  }
}
