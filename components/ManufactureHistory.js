import map from 'lodash/map'
import React, { PureComponent } from 'react'
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import QRCode from 'react-native-qrcode'
import { getHashOfproductData } from '../cloudComputing/Block'
import Colors, { getHashColors } from '../constants/Colors'
import Layout from '../constants/Layout'
import { ContextConsumer } from '../Context'
import FontIcon from './basic/FontIcon'
import HashBlock from './basic/HashBlock'

class DrugQR extends PureComponent {
  render() {
    const { value, borderColor } = this.props
    const {
      window: { width },
      isSmallDevice,
    } = Layout
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 5,
        }}
      >
        <View
          style={{
            padding: 10,
            borderColor: borderColor,
            borderWidth: 4,
            borderRadius: 20,
            backgroundColor: Colors.scrollBGLight,
          }}
        >
          <QRCode
            value={value}
            size={isSmallDevice ? width * 0.9 : width * 0.4}
            bgColor={Colors.dark}
            fgColor={Colors.scrollBGLight}
          />
        </View>
      </View>
    )
  }
}

export default class ManufactureHistory extends PureComponent {
  render() {
    const {
      window: { width },
    } = Layout
    return (
      <ContextConsumer>
        {({ manufacturedDrugs }) =>
          map(manufacturedDrugs, (drug, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  borderBottomColor: Colors.dark,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingVertical: 5,
                  alignItems: 'center',
                }}
                onPress={() =>
                  Alert.alert('QR Information', JSON.stringify(drug))
                }
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontIcon
                    name="drug"
                    size={width * 0.4}
                    color={
                      getHashColors(getHashOfproductData(drug)).backgroundColor
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
                  <DrugQR
                    value={JSON.stringify(drug)}
                    borderColor={
                      getHashColors(getHashOfproductData(drug)).backgroundColor
                    }
                  />
                </View>

                <HashBlock value={getHashOfproductData(drug)} />
              </TouchableOpacity>
            )
          }).reverse()
        }
      </ContextConsumer>
    )
  }
}
