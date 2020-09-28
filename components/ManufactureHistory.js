import map from 'lodash/map'
import React from 'react'
import { Alert, Platform, TouchableOpacity, View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes-expo'
import { getHashOfproductData } from '../cloudComputing/Block'
import Colors, { getHashColors } from '../constants/Colors'
import Layout from '../constants/Layout'
import { ContextConsumer } from '../Context'
import FontIcon from './basic/FontIcon'
import HashBlock from './basic/HashBlock'

function DrugQR(props) {
    const { value, borderColor } = props
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
            content={value}
            size={isSmallDevice ? width * 0.7 : width * 0.4}
          />
        </View>
      </View>
    )
}

export default function ManufactureHistory(props){
    const {
      window: { width },
      isSmallDevice,
    } = Layout
    return (
      <ContextConsumer>
        {({ manufacturedDrugs }) =>
          map(manufacturedDrugs, (drug, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  paddingVertical: 5,
                  alignItems: 'center',
                }}
                onPress={() =>
                  Alert.alert('QR Information', JSON.stringify(drug))
                }
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: isSmallDevice ? 'column' : 'row',
                    alignItems: 'center',
                  }}
                >
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
