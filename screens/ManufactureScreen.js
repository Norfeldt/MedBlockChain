import React from 'react'
import { StyleSheet, ScrollView, Slider } from 'react-native'
import QRCode from 'react-native-qrcode'
import { SHA256 } from 'crypto-js'
import { debounce } from 'lodash'

import Header from '../components/basic/Header'
import InfoRow from '../components/basic/InfoRow'
import Button from '../components/basic/Button'

import Colors from '../constants/Colors'
import Layout from '../constants/Layout'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  constructor(props) {
    super(props)

    this.state = {
      MANUFACTURE_NAME: 'Jukka Labs',
      PRODUCTION_DATE: '24 June 2018',
      DRUG_A_VALUE: 4.25,
      DRUG_A_UNITS: 'mg',
      DRUG_B_VALUE: 80,
      DRUG_B_UNITS: 'mg',
      HASH_SALT: 'HAWQ',
      QR: 'loading',
      hash: 'loading',
      updating: true,
    }

    this.debounceDose = debounce(this.updateDose, 25)
    this.debounceUpdate = debounce(this.updateQRAndHash, 500)
  }

  updateDose(DRUG_X_VALUE) {
    this.setState({ ...DRUG_X_VALUE, updating: true })
    this.debounceUpdate()
  }

  updateQRAndHash() {
    const { QR, hash, updating, ...cleanedState } = this.state // getting state without QR and hash key
    const stateStr = JSON.stringify(cleanedState)
    this.setState({
      QR: stateStr,
      hash: SHA256(stateStr)
        .toString()
        .toUpperCase(),
      updating: false,
    })
  }

  componentDidMount() {
    this.updateQRAndHash()
  }

  render() {
    const {
      MANUFACTURE_NAME,
      PRODUCTION_DATE,
      DRUG_A_VALUE,
      DRUG_A_UNITS,
      DRUG_B_VALUE,
      DRUG_B_UNITS,
      HASH_SALT,
      QR,
      hash,
      updating,
    } = this.state

    const {
      window: { width },
      isSmallDevice,
    } = Layout

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <InfoRow setting="Manufacture" value={MANUFACTURE_NAME} />

        <InfoRow setting="Production Date" value={PRODUCTION_DATE} />

        <InfoRow
          setting="Substance A Dose"
          value={`${DRUG_A_VALUE.toFixed(2)} ${DRUG_A_UNITS}`}
        />
        <Slider
          style={styles.slider}
          minimumTrackTintColor={Colors.tintColor}
          maximumValue={20}
          value={DRUG_A_VALUE}
          step={0.25}
          onValueChange={DRUG_A_VALUE => this.debounceDose({ DRUG_A_VALUE })}
        />

        <InfoRow
          setting="Substance B Dose"
          value={`${DRUG_B_VALUE.toFixed(2)} ${DRUG_B_UNITS}`}
        />
        <Slider
          style={styles.slider}
          minimumTrackTintColor={Colors.tintColor}
          maximumValue={200}
          value={DRUG_B_VALUE}
          step={10}
          onValueChange={DRUG_B_VALUE => this.debounceDose({ DRUG_B_VALUE })}
        />

        <InfoRow setting="Hash Salt" value={HASH_SALT} />

        <QRCode
          value={QR}
          size={isSmallDevice ? width * 0.9 : width * 0.5}
          bgColor={updating ? Colors.idleColor : Colors.tintColor}
          fgColor="white"
        />

        <InfoRow
          setting="Serialize ID (SHA256)"
          value={`${hash.slice(0, 10)}...`}
        />

        <Button title="CHECK IN" iconName="check_in" />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  slider: { height: 60, alignSelf: 'stretch' },
})
