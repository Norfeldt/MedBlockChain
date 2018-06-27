import React from 'react'
//import { Icon } from 'expo'

import Colors from '../constants/Colors'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'q180624')

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    )
  }
}
