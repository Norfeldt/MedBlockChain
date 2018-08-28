import React, { PureComponent } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'q180624')

export default class FontIcon extends PureComponent {
  render() {
    const { style, name, size, color, font } = this.props

    if (font && font.toLowerCase() == 'fontawesome') {
      return <FontAwesome style={style} name={name} size={size} color={color} />
    }
    return <Icon style={style} name={name} size={size} color={color} />
  }
}
