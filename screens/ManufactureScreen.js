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

  state = {
    Manufacture: 'Jukka Labs',
    'Production Date': '24 June 2018',
    'Substance A Dose [mg]': 4.25,
    'Substance B Dose [mg]': 80,
    'Hash Salt': 'HAWQ',
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
        <InfoRow setting="Manufacture" value={this.state['Manufacture']} />

        <InfoRow setting="Production Date" value="24 June 2018" />

        <InfoRow
          setting="Substance A Dose"
          value={`${this.state['Substance A Dose [mg]'].toFixed(2)} mg`}
        />
        <Slider
          style={styles.slider}
          minimumTrackTintColor={Colors.tintColor}
          maximumValue={20}
          value={this.state['Substance A Dose [mg]']}
          step={0.25}
          onValueChange={value =>
            this.setState({ 'Substance A Dose [mg]': value })
          }
        />

        <InfoRow
          setting="Substance B Dose"
          value={`${this.state['Substance B Dose [mg]']} mg`}
        />
        <Slider
          style={styles.slider}
          minimumTrackTintColor={Colors.tintColor}
          maximumValue={200}
          value={this.state['Substance B Dose [mg]']}
          step={10}
          onValueChange={value =>
            this.setState({ 'Substance B Dose [mg]': value })
          }
        />
        <InfoRow setting="Hash Salt" value={this.state['Hash Salt']} />

        <QRCode
          value={JSON.stringify({ ...this.state })}
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
