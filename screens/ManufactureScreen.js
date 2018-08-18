import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { ContextConsumer } from '../Context'
import Header from '../components/basic/Header'
import SectionTitle from '../components/basic/SectionTitle'
import Button from '../components/basic/Button'
import ListData from '../components/ListData'
import DoseAdjuster from '../components/DoseAdjuster'
import ManufactureHistory from '../components/ManufactureHistory'

import Colors from '../constants/Colors'
import HashBlock from '../components/basic/HashBlock'

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.scrollBG }}>
        <View style={{ alignContent: 'center', paddingHorizontal: 10 }}>
          <SectionTitle name="DRUG DATA" />
          <ContextConsumer>
            {({ drugData }) => {
              return <ListData data={drugData} />
            }}
          </ContextConsumer>
          <SectionTitle name="DOSING" />
          <DoseAdjuster />
          <SectionTitle name="REGISTER" />
          <ContextConsumer>
            {({ drugDataHash, checkIN }) => {
              return (
                <View>
                  <HashBlock value={drugDataHash} />

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
