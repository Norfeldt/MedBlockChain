import React from 'react'
import { ScrollView, StyleSheet, View, Platform } from 'react-native'
import OptionSwitch from '../components/OptionSwitch'
import SectionTitle from '../components/basic/SectionTitle'
import Header from '../components/basic/Header'
import DosePrescription from '../components/DosePrescription'
import Colors from '../constants/Colors'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Monitoring" />,
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.prescription}>
          <DosePrescription style={{ paddingVertical: 10 }} />
        </View>

        <ScrollView style={styles.scroll}>
          <SectionTitle name="PRO. HEALTHCARE" />
          <OptionSwitch name="doctor" desc="Patient records" />

          <SectionTitle name="INTERNET OF THINGS" />
          <OptionSwitch name="weight_iot" desc="Weight" />
          <OptionSwitch name="sleep_iot" desc="Sleep tracking" />
          <OptionSwitch name="walk" desc="Step count" />
          <OptionSwitch name="smartwatch" />

          <SectionTitle name="SERVICES" />
          <OptionSwitch name="dna" desc="Genetics" />
          <OptionSwitch name="spendings" />
          <OptionSwitch name="fitness_center" desc="Fitness usage" />

          <SectionTitle name="SOCIAL ACTIVITIES" />
          <OptionSwitch name="facebook" font="FontAwesome" />
          <OptionSwitch name="twitter" font="FontAwesome" />
          <OptionSwitch name="instagram" font="FontAwesome" />
          <OptionSwitch name="snapchat" font="FontAwesome" />
          <OptionSwitch name="youtube" font="FontAwesome" />
          <OptionSwitch name="reddit" font="FontAwesome" />
          <OptionSwitch name="meetup" font="FontAwesome" />
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 0,
    paddingBottom: 20,
  },
  prescription: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.panel,
    borderColor: Colors.panelOutline,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
        },
      },
      android: {
        elevation: 1,
        position: 'relative',
      },
    }),
  },
})
