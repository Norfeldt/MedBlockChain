import { BarCodeScanner, Permissions } from 'expo'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/basic/Button'
import Header from '../components/basic/Header'
import DrugHistory from '../components/DrugHistory'

const barCodeDataTemp = {
  MANUFACTURE_NAME: null,
  PRODUCTION_DATE: null,
  DRUG_A_VALUE: null,
  DRUG_A_UNITS: null,
  DRUG_B_VALUE: null,
  DRUG_B_UNITS: null,
  HASH_SALT: null,
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Patient" />,
  }

  state = {
    barCodeData: barCodeDataTemp,
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
          <View style={{ flex: 1 }}>
            {barCodeData === barCodeDataTemp && (
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
            )}

            {barCodeData != barCodeDataTemp && (
              <DrugCard
                dateTaken={null}
                manufacture={barCodeData.MANUFACTURE_NAME}
                productionDate={barCodeData.PRODUCTION_DATE}
                subADose={barCodeData.DRUG_A_VALUE}
                subAUnits={barCodeData.DRUG_A_UNITS}
                subBDose={barCodeData.DRUG_B_VALUE}
                subBUnits={barCodeData.DRUG_B_UNITS}
                salt={barCodeData.HASH_SALT}
                checked_out={false}
                onCancelPress={() => {
                  this.setState({ barCodeData: barCodeDataTemp })
                }}
                onCheckInPress={() => {
                  alert('TODO Centralized block-chain')
                }}
              />
            )}

            <DrugHistory />
          </View>
        )
      }
    }

    return (
      <View style={styles.container}>
        <RenderView />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
})
