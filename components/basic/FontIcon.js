import React, { PureComponent } from 'react'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'q180624')

export default class FontIcon extends PureComponent {
  render() {
    const { name, size, color } = this.props
    return <Icon name={name} size={size} color={color} />
  }
}
