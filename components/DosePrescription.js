import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../constants/Colors'
import FontIcon from './basic/FontIcon'
import Text from './basic/Text'
import { ContextConsumer } from '../Context'

export default class DosePrescription extends PureComponent {
  render() {
    const { style } = this.props
    return (
      <ContextConsumer>
        {context => {
          const { minDose, maxDose } = context.getDoseRange()

          return (
            <View
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                style,
              ]}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontIcon name="machine_learning" size={40} />
                <Text type="p" style={{ marginTop: 5 }}>
                  Recommended Prescription
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}
              >
                <Text style={{ flex: 15, fontSize: 12 }}>
                  {minDose.toFixed(2)}
                </Text>
                <View
                  style={{
                    flex: 70,
                    flexDirection: 'row',
                    backgroundColor: Colors.scrollBG,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: Colors.passive,
                    paddingVertical: 2,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                  <View
                    style={{
                      flex: 8,
                      backgroundColor: Colors.themeColor,
                      borderRadius: 3,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                    }}
                  />
                </View>
                <Text style={{ flex: 15, fontSize: 12 }}>
                  {maxDose.toFixed(2)}
                </Text>
              </View>
            </View>
          )
        }}
      </ContextConsumer>
    )
  }
}
