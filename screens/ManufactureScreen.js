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

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  render() {
    return (
      <ContextConsumer>
        {context => {
          return (
            <ScrollView style={{ flex: 1, backgroundColor: Colors.scrollBG }}>
              <View style={{ alignContent: 'center', paddingHorizontal: 10 }}>
                <SectionTitle name="DRUG DATA" />
                <ListData data={context.drugData} />
                <SectionTitle name="DOSING" />
                <DoseAdjuster />
                <SectionTitle name="REGISTER" />
                <Button title="CHECK IN" iconName="check_in" />
                {/* // FIXME: List Previous checked IN drugs */}
                <SectionTitle name="BLOCKCHAINED" />
                <ManufactureHistory />
              </View>
            </ScrollView>
          )
        }}
      </ContextConsumer>
    )
  }
}
