import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import Button from '../components/basic/Button'
import HashBlock from '../components/basic/HashBlock'
import Header from '../components/basic/Header'
import SectionTitle from '../components/basic/SectionTitle'
import DoseAdjuster from '../components/DoseAdjuster'
import ListData from '../components/ListData'
import ManufactureHistory from '../components/ManufactureHistory'
import Colors from '../constants/Colors'
import { ContextConsumer } from '../Context'
import DosePrescription from '../components/DosePrescription'

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.scrollBG }}>
        <View style={{ alignContent: 'center', paddingHorizontal: 10 }}>
          <SectionTitle name="PRODUCT DATA" />
          <ContextConsumer>
            {({ productData }) => {
              return <ListData data={productData} />
            }}
          </ContextConsumer>
          <SectionTitle name="DOSING" />
          <DosePrescription />
          <DoseAdjuster />
          <SectionTitle name="CHECK IN" />
          <ContextConsumer>
            {({ productDataHash, checkIN }) => {
              return (
                <View>
                  <HashBlock value={productDataHash} />

                  <Button
                    title="CHECK IN"
                    iconName="check_in"
                    onPress={checkIN}
                  />
                </View>
              )
            }}
          </ContextConsumer>

          <SectionTitle name="BLOCKCHAINED" />
          <ManufactureHistory />
        </View>
      </ScrollView>
    )
  }
}
