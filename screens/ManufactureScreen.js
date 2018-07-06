import React from 'react'
import { StyleSheet, ScrollView, Slider } from 'react-native'
import QRCode from 'react-native-qrcode'
import { SHA256 } from 'crypto-js'

import Header from '../components/Header'
import InfoRow from '../components/InfoRow'
import Button from '../components/Button'

import Colors from '../constants/Colors'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  state = {
    MANUFACTURE_NAME: 'Jukka Labs',
    PRODUCTION_DATE: '24 June 2018',
    DRUG_A_VALUE: 4.25,
    DRUG_A_UNITS: 'mg',
    DRUG_B_VALUE: 80,
    DRUG_B_UNITS: 'mg',
    HASH_SALT: 'HAWQ',
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
    } = this.state

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
          onValueChange={DRUG_A_VALUE => this.setState({ DRUG_A_VALUE })}
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
          onValueChange={DRUG_B_VALUE => this.setState({ DRUG_B_VALUE })}
        />

        <InfoRow setting="Hash Salt" value={HASH_SALT} />

        <QRCode
          value={JSON.stringify({ ...this.state })}
          size={150}
          bgColor={Colors.tintColor}
          fgColor="white"
        />

        <InfoRow
          setting="Serialize ID (SHA256)"
          value={`${SHA256(JSON.stringify({ ...this.state }))
            .toString()
            .slice(0, 10)}...`}
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
