import { BarCodeScanner, Permissions } from 'expo'
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Button from '../components/basic/Button'
import Header from '../components/basic/Header'
import SectionTitle from '../components/basic/SectionTitle'
import DrugHistory from '../components/DrugHistory'
import Colors from '../constants/Colors'
import GenuineDrugs from '../components/GenuineDrugs'
import Text from '../components/basic/Text'
import { ContextConsumer } from '../Context'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Patient" />,
  }

  state = {
    barCodeData: null,
    scanning: false,
  }

  barCodeReadComplete = ({ type, data }) => {
    const barCodeData = { ...JSON.parse(data) }
    // TODO: do some validation of barCodeData
    this.setState({ barCodeData, scanning: false })
  }

  render() {
    const { barCodeData, scanning } = this.state

    RenderView = props => {
      if (scanning) {
        return (
          <View style={{ flex: 1, marginBottom: 10 }}>
            <BarCodeScanner
              onBarCodeRead={this.barCodeReadComplete}
              style={StyleSheet.absoluteFill}
            />
          </View>
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

            <ContextConsumer>
              {({ genuineDrugs }) => {
                if (genuineDrugs.length != 0) {
                  return (
                    <Text style={{ color: Colors.themeColor }}>OR PICK</Text>
                  )
                } else {
                  return null
                }
              }}
            </ContextConsumer>

            <GenuineDrugs />

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
