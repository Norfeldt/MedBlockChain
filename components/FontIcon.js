import React from 'react'

import { createIconSetFromFontello } from '@expo/vector-icons'
import fontelloConfig from '../assets/fonts/config.json'
const Icon = createIconSetFromFontello(fontelloConfig, 'q180624')

export default (Button = ({ name, size, color }) => {
  return <Icon name={name} size={size} color={color} />
})
