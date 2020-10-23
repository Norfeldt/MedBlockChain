import map from 'lodash/map'
import React, { useState } from 'react'
import { Alert, Platform, TouchableOpacity, View } from 'react-native'
import { QRCode } from 'react-native-custom-qr-codes-expo'

import { getHashOfproductData } from '../cloudComputing/Block'
import Colors, { getHashColors } from '../constants/Colors'
import Layout from '../constants/Layout'
import { ContextConsumer } from '../Context'
import FontIcon from './basic/FontIcon'
import HashBlock from './basic/HashBlock'
import Text from './basic/Text'

export default function ManufactureHistory(props) {
  const {
    window: { width },
    isSmallDevice,
  } = Layout
  return (
    <ContextConsumer>
      {({ manufacturedDrugs }) =>
        map(manufacturedDrugs, (drug, index) => {
          return (
            <View
              key={index}
              style={{
                paddingVertical: 5,
                alignItems: 'center',
              }}
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
                  qrInfo={JSON.stringify(drug)}
                  borderColor={
                    getHashColors(getHashOfproductData(drug)).backgroundColor
                  }
                />
              </View>

              <HashBlock value={getHashOfproductData(drug)} />
            </View>
          )
        }).reverse()
      }
    </ContextConsumer>
  )
}

const DrugQR = ({ qrInfo, borderColor }) => {
  const [showQR, setShowQR] = useState(false)

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
        {showQR ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('QR Information', qrInfo)
            }}
          >
            <QRCode
              content={qrInfo}
              size={
                isSmallDevice ? parseInt(width * 0.7) : parseInt(width * 0.4)
              }
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowQR(true)
            }}
          >
            <Text
              style={{ textAlignVertical: 'center', textAlign: 'center' }}
            >{`Open\nTamper Seal`}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
