import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Alert, Platform } from 'react-native'
import Layout from '../constants/Layout'
import { ContextConsumer } from '../Context'
import FontIcon from './basic/FontIcon'
import Text from './basic/Text'

export default class FalsifiedDrugs extends PureComponent {
  render() {
    const {
      window: { width },
    } = Layout
    return (
      <ContextConsumer>
        {({ manufacturedDrugs, checkOUT, getFalsifiedDrug }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'FALSIFIED DRUGS',
                  'Pick one of the following options',
                  [
                    {
                      text: 'CHECKED IN AND OUT',
                      onPress: () => checkOUT(manufacturedDrugs[0]),
                    },
                    {
                      text: 'CHECKED IN BUT NOT OUT',
                      onPress: () => {
                        checkOUT(manufacturedDrugs[1], true)
                      },
                    },
                    {
                      text: 'NEITHER CHECKED IN OR OUT',
                      onPress: () => {
                        const drugData = getFalsifiedDrug(
                          'Criminal Drug Dealer'
                        )
                        checkOUT(drugData)
                      },
                    },
                  ]
                )
              }
            >
              <View
                style={{
                  paddingTop: 3,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                }}
              >
                <Text type="p" style={{ paddingBottom: 5, color: 'grey' }}>
                  Falsified Drugs
                </Text>
                <FontIcon
                  name="drugDealer"
                  size={width * 0.25}
                  color={'grey'}
                  style={{
                    ...Platform.select({
                      ios: {
                        shadowColor: '#000000',
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                        shadowOffset: {
                          height: 1,
                          width: 0.3,
                        },
                      },
                      android: {
                        elevation: 1,
                        position: 'relative',
                      },
                    }),
                  }}
                />
              </View>
            </TouchableOpacity>
          )
        }}
      </ContextConsumer>
    )
  }
}
