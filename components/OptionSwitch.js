import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { Switch } from 'react-native-switch'
import Colors from '../constants/Colors'
import { ContextConsumer } from '../Context'
import FontIcon from './basic/FontIcon'
import Text from './basic/Text'

export default function App(props) {
  const [ value, setValue ] = useState(false);
  const { name, desc, font, LPI, UPI } = props
  const title = desc || name

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FontIcon
            name={name}
            font={font}
            size={30}
            style={{ marginRight: 10, width: 30 }}
            color={Colors.themeColor}
          />
          <Text style={{ flex: 1, fontSize: 18, textAlign: 'left' }}>
            {title.toUpperCase()}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <ContextConsumer>
            {({ updatePrescriptionDose }) => {
              return (
                <Switch
                  onValueChange={value => {
                    const impact = value ? +1 : -1
                    updatePrescriptionDose(LPI * impact, UPI * impact)
                    setValue(value);
                    //this.setState({ value })
                  }}
                  value={value}
                  backgroundActive={Colors.themeColor}
                  backgroundInactive={Colors.passiveBG}
                  innerCircleStyle={{
                    borderWidth: 1,
                    borderColor: Colors.passive,
                  }}
                  circleSize={35}
                  barHeight={35}
                  renderInsideCircle={() => (
                    <Image
                      style={{ width: 34, height: 34, padding: 1 }}
                      source={require('../assets/images/knob.png')}
                    />
                  )}
                />
              )
            }}
          </ContextConsumer>
        </View>
      </View>
    )
}
