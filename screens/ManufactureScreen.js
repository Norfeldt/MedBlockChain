import React, { Component } from 'react'
import { ScrollView, View, Slider, StyleSheet } from 'react-native'

const SHA256 = require('crypto-js/sha256')
import debounce from 'lodash/debounce'

import Header from '../components/basic/Header'
import SectionTitle from '../components/basic/SectionTitle'
import Button from '../components/basic/Button'
import ListData from '../components/ListData'
import DrugQR from '../components/DrugQR'

import Colors from '../constants/Colors'

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  constructor(props) {
    super(props)
    const manufacture = 'Jukka Labs'
    this.state = {
      drugData: {
        manufacture,
        productionDate: new Date().toISOString(),
        ActivePharmIngredient: '4.25 mg',
        hashSalt: this.makeHashSalt(),
      },
      drugDataHash: 'loading',
      drugMetaData: {
        manufacture,
      },
      QR: 'loading',
      updating: true,
    }

    this.debounceDose = debounce(this.updateDose, 25)
    this.debounceUpdate = debounce(this.updateQRAndHash, 500)
  }

  makeHashSalt = () => {
    return (
      SHA256(Math.random().toString())
        .toString()
        .slice(0, 5)
        .toUpperCase() +
      ' ' +
      SHA256(Math.random().toString())
        .toString()
        .slice(0, 5)
        .toUpperCase()
    )
  }

  updateDose(value) {
    const { drugData } = { ...this.state }
    drugData.ActivePharmIngredient =
      value.toFixed(2) + drugData.ActivePharmIngredient.replace(/[\d\.]*/g, '')
    drugData.productionDate = new Date().toISOString()

    // TODO: Make the hash salt update random!
    drugData.hashSalt = this.makeHashSalt()

    this.setState({ drugData, updating: true })
    this.debounceUpdate()
  }

  updateQRAndHash() {
    const { drugMetaData, QR, hash, updating, ...drugData } = this.state // getting state without QR and hash key
    const drugDataSTRING = JSON.stringify(drugData)
    this.setState({
      QR: drugDataSTRING,
      hash: SHA256(drugDataSTRING)
        .toString()
        .toUpperCase(),
      updating: false,
    })
  }

  componentDidMount() {
    this.updateQRAndHash()
  }

  render() {
    const { drugData } = this.state

    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.scrollBG }}>
        <View style={{ alignContent: 'center', paddingHorizontal: 10 }}>
          <SectionTitle name="DRUG DATA" />
          <ListData data={drugData} />
          <Slider
            style={{ height: 60, alignSelf: 'stretch' }}
            minimumTrackTintColor={Colors.tintColor}
            maximumValue={20}
            value={parseFloat(
              drugData.ActivePharmIngredient.replace(/[^\d\.]*/g, '')
            )}
            step={0.25}
            onValueChange={value => this.debounceDose(value)}
          />
          <SectionTitle name="REGISTER" />
          <Button title="CHECK IN" iconName="check_in" />
          // FIXME: List Previous checked IN drugs
          <SectionTitle name="CHECKED IN" />
          <DrugQR value={this.state.QR} />
        </View>
      </ScrollView>
    )
  }
}
