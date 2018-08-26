import map from 'lodash/map'
import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import QRCode from 'react-native-qrcode'
import { getHashOfDrugData } from '../cloudComputing/Block'
import Colors from '../constants/Colors'
import Conventions from '../constants/Conventions'
import Layout from '../constants/Layout'
import { ContextConsumer } from '../Context'
import HashBlock from './basic/HashBlock'
import Text from './basic/Text'

class DrugQR extends PureComponent {
  render() {
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
            borderColor: Colors.headerLine,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 20,
            backgroundColor: Colors.scrollBGLight,
          }}
        >
          <QRCode
            value={this.props.value}
            size={isSmallDevice ? width * 0.9 : width * 0.5}
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
                  marginBottom: 5,
                }}
                onPress={() =>
                  Alert.alert('QR Information', JSON.stringify(drug))
                }
              >
                <Text type="passiveHeader">
                  {Conventions.datetimeStr(drug.productionDate)}
                </Text>
                <DrugQR value={JSON.stringify(drug)} />
                <HashBlock value={getHashOfDrugData(drug)} />
              </TouchableOpacity>
            )
          }).reverse()
        }
      </ContextConsumer>
    )
  }
}
