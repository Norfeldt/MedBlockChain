import React from 'react'
import { StyleSheet, ScrollView, Slider } from 'react-native'
import QRCode from 'react-native-qrcode'

import Header from '../components/Header'
import InfoRow from '../components/InfoRow'
import Button from '../components/Button'

import Colors from '../constants/Colors'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <InfoRow setting="Manufacture" value="Jukka Labs" />
        <InfoRow setting="Production Date" value="24 June 2018" />
        <InfoRow setting="Substance A Dose" value="4 mg" />
        <Slider
          style={styles.slider}
          maximumValue={20}
          value={4}
          onValueChange={value => this.setState({ value })}
        />
        <InfoRow setting="Substance B Dose" value="80 mg" />
        <Slider
          style={styles.slider}
          maximumValue={200}
          value={80}
          onValueChange={value => this.setState({ value })}
        />
        <InfoRow setting="Hash Salt" value="HAWQ" />
        <QRCode
          value={'Hello World'}
          size={150}
          bgColor={Colors.tintColor}
          fgColor="white"
        />

        <InfoRow setting="Serialize ID" value="#?" />
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
