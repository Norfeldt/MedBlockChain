import map from 'lodash/map'
import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'
import { getHashOfDrugData } from '../cloudComputing/Block'
import { getHashColors } from '../constants/Colors'
import Layout from '../constants/Layout'
import { ContextConsumer } from '../Context'
import FontIcon from './basic/FontIcon'

export default class GenuineDrugs extends PureComponent {
  render() {
    const {
      window: { width },
    } = Layout
    return (
      <ContextConsumer>
        {({ genuineDrugs, checkOUT }) => {
          return (
            <ScrollView horizontal={true} style={this.props.style}>
              {map(genuineDrugs, (drug, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginRight: 5,
                      paddingRight: 5,
                    }}
                    onPress={() =>
                      Alert.alert('DRUG DATA', JSON.stringify(drug), [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                        },
                        {
                          text: 'CHECK IN',
                          onPress: () => checkOUT(drug),
                        },
                      ])
                    }
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        padding: 5,
                      }}
                    >
                      <FontIcon
                        name="drug"
                        size={width * 0.3}
                        color={
                          getHashColors(getHashOfDrugData(drug)).backgroundColor
                        }
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
              })}
            </ScrollView>
          )
        }}
      </ContextConsumer>
    )
  }
}
