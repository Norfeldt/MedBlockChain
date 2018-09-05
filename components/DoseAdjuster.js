import debounce from 'lodash/debounce'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Slider from 'react-native-slider'
import Colors from '../constants/Colors'
import { ContextConsumer } from '../Context'
import Text from './basic/Text'

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
              <Text style={{ flex: 7, fontSize: 12 }}>
                {minDose.toFixed(0)}
              </Text>
              <Slider
                style={{ flex: 70, height: 60, alignSelf: 'stretch' }}
                minimumTrackTintColor={Colors.tintColor}
                minimumValue={minDose}
                maximumValue={maxDose}
                value={context.getDose()}
                step={1}
                onValueChange={debounce(value => context.setDose(value), 50)}
              />
              <Text style={{ flex: 7, fontSize: 12 }}>
                {maxDose.toFixed(0)}
              </Text>
            </View>
          )
        }}
      </ContextConsumer>
    )
  }
}
