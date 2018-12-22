import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import Header from '../components/basic/Header'
import SectionTitle from '../components/basic/SectionTitle'
import DosePrescription from '../components/DosePrescription'
import OptionSwitch from '../components/OptionSwitch'
import Colors from '../constants/Colors'
import SourceCodeLink from '../components/SourceCodeLink'

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
          <OptionSwitch
            name="doctor"
            desc="Patient records"
            LPI={20}
            UPI={10}
          />
          <OptionSwitch
            name="patient"
            desc="Medication History"
            LPI={25}
            UPI={10}
          />

          <SectionTitle name="INTERNET OF THINGS" />
          <OptionSwitch name="weight_iot" desc="Weight" UPI={5} />
          <OptionSwitch
            name="sleep_iot"
            desc="Sleep tracking"
            LPI={10}
            UPI={5}
          />
          <OptionSwitch name="walk" desc="Step count" LPI={5} />
          <OptionSwitch name="smartwatch" desc="Wearables" LPI={15} />

          <SectionTitle name="SERVICES" />
          <OptionSwitch name="dna" desc="Genetic Profile" LPI={20} UPI={30} />
          <OptionSwitch name="smartphone" desc="Diet App" LPI={10} UPI={10} />
          <OptionSwitch
            name="fitness_center"
            desc="Fitness Usage"
            LPI={2}
            UPI={2}
          />
          <OptionSwitch name="spendings" LPI={10} UPI={10} />

          <SectionTitle name="SOCIAL ACTIVITIES" />
          <OptionSwitch name="facebook" font="FontAwesome" LPI={15} UPI={2} />
          <OptionSwitch name="twitter" font="FontAwesome" LPI={7} UPI={2} />
          <OptionSwitch name="instagram" font="FontAwesome" LPI={7} UPI={2} />
          <OptionSwitch name="snapchat" font="FontAwesome" LPI={0} UPI={0} />
          <View style={{ height: 20 }} />

          <SourceCodeLink />
          <View style={{ height: 30 }} />
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
