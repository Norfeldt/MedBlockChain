import { BarCodeScanner, Permissions } from 'expo'
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Button from '../components/basic/Button'
import Header from '../components/basic/Header'
import SectionTitle from '../components/basic/SectionTitle'
import DrugHistory from '../components/DrugHistory'
import Colors from '../constants/Colors'
import GenuineDrugs from '../components/GenuineDrugs'
import FalsifiedDrugs from '../components/FalsifiedDrugs'
import Text from '../components/basic/Text'
import { ContextConsumer } from '../Context'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Patient" />,
  }

  state = {
    scanning: false,
  }

  render() {
    const { scanning } = this.state

    RenderView = props => {
      if (scanning) {
        return (
          <ContextConsumer>
            {({ checkOUT }) => (
              <View style={{ flex: 1, marginBottom: 10 }}>
                <BarCodeScanner
                  onBarCodeRead={({ type, data }) => {
                    checkOUT({ ...JSON.parse(data) })
                    this.setState({ scanning: false })
                  }}
                  style={StyleSheet.absoluteFill}
                />
              </View>
            )}
          </ContextConsumer>
        )
      } else {
        return (
          <ScrollView style={blockStyles.container}>
            <SectionTitle name="AVAILABLE DRUGS" />
            <Button
              title="SCAN DRUG"
              iconName="QR_Code"
              onPress={async () => {
                const { status } = await Permissions.askAsync(
                  Permissions.CAMERA
                )
                this.setState({
                  scanning: status === 'granted',
                })
              }}
            />

            <Text style={{ color: Colors.themeColor }}>OR PICK</Text>

            <ScrollView horizontal={true}>
              <GenuineDrugs style={{ flexDirection: 'row' }} />
              <View style={{ borderLeftWidth: 1 }} />
              <FalsifiedDrugs />
            </ScrollView>

            <SectionTitle name="MEDICATION HISTORY" />

            <DrugHistory />
          </ScrollView>
        )
      }
    }

    return <RenderView />
  }
}

const blockStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.scrollBG,
    paddingHorizontal: 10,
  },
})
