import map from 'lodash/map'
import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'
import { getHashOfDrugData } from '../cloudComputing/Block'
import Colors, { hashColors } from '../constants/Colors'
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
        {/* FIXME: use availableDrugs from state instead (need to make it) */}
        {({ manufacturedDrugs }) => {
          return (
            <ScrollView horizontal={true} style={this.props.style}>
              {map(manufacturedDrugs, (drug, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      marginRight: 5,
                      paddingRight: 5,
                    }}
                    onPress={() =>
                      // FIXME: CheckOUT drug
                      Alert.alert('QR Information', JSON.stringify(drug))
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
                          hashColors(getHashOfDrugData(drug)).backgroundColor
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
