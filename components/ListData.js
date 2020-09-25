import React, { useState } from 'react'
import { View } from 'react-native'

import reduce from 'lodash/reduce'
import lowerCase from 'lodash/lowerCase'
import capitalize from 'lodash/capitalize'

import InfoRow from './basic/InfoRow'

export default function ListData(props) {
 // render() {
    const { data } = props;
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
//  }
}
