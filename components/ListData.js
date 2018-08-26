import React, { Component } from 'react'
import { View } from 'react-native'

import reduce from 'lodash/reduce'
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'

import InfoRow from './basic/InfoRow'

export default class ListData extends Component {
  render() {
    const { data } = this.props
    return (
      <View>
        {reduce(
          data,
          (acc, value, key) => {
            acc = [
              ...acc,
              <InfoRow
                key={key}
                setting={lowerCase(key)
                  .split(' ')
                  .map(word => capitalize(word))
                  .join(' ')}
                value={String(value)}
              />,
            ]
            return acc
          },
          []
        )}
      </View>
    )
  }
}
