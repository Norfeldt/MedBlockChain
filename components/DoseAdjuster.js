import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Text from './basic/Text'
import Slider from 'react-native-slider'

import debounce from 'lodash/debounce'

import { ContextConsumer } from '../Context'

import Colors from '../constants/Colors'

export default class DoseAdjuster extends PureComponent {
  render() {
    return (
      <ContextConsumer>
        {context => {
          const { minDose, maxDose } = context.getDoseRange()
          return (
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ flex: 15, fontSize: 12 }}>
                {minDose.toFixed(2)}
              </Text>
              <Slider
                style={{ flex: 70, height: 60, alignSelf: 'stretch' }}
                minimumTrackTintColor={Colors.tintColor}
                minimumValue={minDose}
                maximumValue={maxDose}
                value={context.getDose()}
                step={0.25}
                onValueChange={debounce(value => context.setDose(value), 50)}
              />
              <Text style={{ flex: 15, fontSize: 12 }}>
                {maxDose.toFixed(2)}
              </Text>
            </View>
          )
        }}
      </ContextConsumer>
    )
  }
}
