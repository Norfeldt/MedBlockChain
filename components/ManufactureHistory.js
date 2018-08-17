import invert from 'invert-color'
import map from 'lodash/map'
import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import QRCode from 'react-native-qrcode'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { ContextConsumer } from '../Context'
import format from 'date-fns/format'
import trim from 'lodash/trim'
const SHA256 = require('crypto-js/sha256')

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
          padding: 10,
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
            const drugStr = JSON.stringify(drug)
            const drugHash = SHA256(drugStr)
              .toString()
              .toUpperCase()
            const hashColor = `#${drugHash.slice(0, 6)}`
            const hashTextColor = invert(hashColor, true)
            return (
              <View
                key={index}
                style={{
                  borderBottomColor: Colors.dark,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginBottom: 20,
                }}
              >
                {' '}
                <Text style={textStyle.datetime}>
                  {format(drug.productionDate, 'YYYY-MM-DD T HH:MM ZZ')}
                </Text>
                <DrugQR value={drugStr} />
                <View
                  style={{
                    backgroundColor: hashColor,
                    margin: 10,
                    padding: 10,
                    borderRadius: 7,
                  }}
                >
                  <Text
                    style={[textStyle.hash, { color: hashTextColor }]}
                  >{`${trim(drugHash.replace(/(.{32})/g, '$1\n'))}`}</Text>
                </View>
              </View>
            )
          })
        }
      </ContextConsumer>
    )
  }
}

const textStyle = StyleSheet.create({
  datetime: {
    color: Colors.headerLine,
    fontFamily: 'Aldrich',
    fontSize: 14,
    textAlign: 'center',
  },
  hash: {
    fontFamily: 'NovaMono',
    fontSize: 14,
    textAlign: 'center',
  },
})
