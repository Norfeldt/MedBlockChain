import React from 'react'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'q180624')

export default class FontIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={this.props.size}
        color={this.props.color}
      />
    )
  }
}
