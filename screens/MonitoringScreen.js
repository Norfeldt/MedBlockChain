import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import OptionSwitch from '../components/OptionSwitch'
import SectionTitle from '../components/basic/SectionTitle'
import Header from '../components/basic/Header'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Monitoring" />,
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SectionTitle name="PRO. HEALTHCARE" />
        <OptionSwitch name="doctor" desc="Patient record" />

        <SectionTitle name="INTERNET OF THINGS" />
        <OptionSwitch name="weight_iot" desc="Weight" />
        <OptionSwitch name="sleep_iot" desc="Sleep tracking" />
        <OptionSwitch name="walk" desc="Step count" />
        <OptionSwitch name="smartwatch" />

        <SectionTitle name="SERVICES" />
        <OptionSwitch name="spendings" />
        <OptionSwitch name="fitness_center" desc="Fitness usage" />

        <SectionTitle name="SOCIAL ACTIVITIES" />
        <OptionSwitch name="facebook" fontAwesome={true} />
        <OptionSwitch name="twitter" fontAwesome={true} />
        <OptionSwitch name="instagram" fontAwesome={true} />
        <OptionSwitch name="snapchat" fontAwesome={true} />
        <OptionSwitch name="youtube" fontAwesome={true} />
        <OptionSwitch name="reddit" fontAwesome={true} />
        <OptionSwitch name="meetup" fontAwesome={true} />
        <View style={{ height: 20 }} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 0,
    paddingBottom: 20,
  },
})
