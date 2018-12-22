import { BarCodeScanner, Permissions } from 'expo'
import React from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from '../components/basic/Button'
import Header from '../components/basic/Header'
import SectionTitle from '../components/basic/SectionTitle'
import Text from '../components/basic/Text'
import DrugHistory from '../components/DrugHistory'
import FalsifiedDrugs from '../components/FalsifiedDrugs'
import GenuineDrugs from '../components/GenuineDrugs'
import Colors from '../constants/Colors'
import { ContextConsumer } from '../Context'
import SourceCodeLink from '../components/SourceCodeLink'

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
              <View style={{ flex: 1 }}>
                <BarCodeScanner
                  style={{ flex: 1 }}
                  onBarCodeRead={({ type, data }) => {
                    this.setState({ scanning: false })

                    Alert.alert('PRODUCT DATA', data, [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                      },
                      {
                        text: 'CHECK OUT',
                        onPress: () => checkOUT({ ...JSON.parse(data) }),
                      },
                    ])
                  }}
                />
                <View
                  style={{
                    backgroundColor: Colors.passiveBG,
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ scanning: false })}
                  >
                    <Text
                      style={{
                        color: Colors.passive,
                        textAlign: 'center',
                        paddingVertical: 15,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ContextConsumer>
        )
      } else {
        return (
          <ScrollView style={blockStyles.container}>
            <SectionTitle name="CHECK OUT" />

            <ScrollView horizontal={true}>
              <GenuineDrugs style={{ flexDirection: 'row' }} />
              <View style={{ borderLeftWidth: 1 }} />
              <FalsifiedDrugs />
            </ScrollView>

            <Button
              title="SCAN PRODUCT"
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

            <SectionTitle name="MEDICATION HISTORY" />

            <DrugHistory />

            <SourceCodeLink />
            <View style={{ height: 30 }} />
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
