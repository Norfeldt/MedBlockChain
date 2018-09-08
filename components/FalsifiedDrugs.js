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
        {({ manufacturedDrugs, genuineDrugs, checkOUT, getFalsifiedDrug }) => {
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
                        if (genuineDrugs.length == 0) {
                          Alert.alert(
                            'IMPOSSIBLE',
                            'You need to manufacture and CHECK IN some drugs first'
                          )
                        } else {
                          checkOUT(genuineDrugs[0], true)
                        }
                      },
                    },
                    {
                      text: 'NEITHER CHECKED IN OR OUT',
                      onPress: () => {
                        const productData = getFalsifiedDrug(
                          'Criminal Drug Dealer'
                        )
                        checkOUT(productData)
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
                  Falsified Medicine
                </Text>
                <FontIcon
                  name="drugDealer"
                  size={width * 0.25}
                  color={'grey'}
                  style={{
                    paddingHorizontal: width * 0.1,
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
