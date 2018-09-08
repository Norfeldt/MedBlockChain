import React, { PureComponent } from 'react'
import { Switch, View } from 'react-native'
import Colors from '../constants/Colors'
import { ContextConsumer } from '../Context'
import FontIcon from './basic/FontIcon'
import Text from './basic/Text'

export default class App extends PureComponent {
  state = {
    value: false,
  }

  render() {
    const { name, desc, font, LPI, UPI } = this.props
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
                    this.setState({ value })
                  }}
                  value={this.state.value}
                  onTintColor={Colors.themeColor}
                />
              )
            }}
          </ContextConsumer>
        </View>
      </View>
    )
  }
}
