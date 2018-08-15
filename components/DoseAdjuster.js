import React, { PureComponent } from 'react'
import { Slider } from 'react-native'

import debounce from 'lodash/debounce'

import { ContextConsumer } from '../Context'

import Colors from '../constants/Colors'

export default class DoseAdjuster extends PureComponent {
  render() {
    return (
      <ContextConsumer>
        {context => {
          return (
            <Slider
              style={{ height: 60, alignSelf: 'stretch' }}
              minimumTrackTintColor={Colors.tintColor}
              minimumValue={context.getDoseRange().minDose}
              maximumValue={context.getDoseRange().maxDose}
              value={context.getDose()}
              step={0.25}
              onValueChange={debounce(value => context.setDose(value), 50)}
            />
          )
        }}
      </ContextConsumer>
    )
  }
}
