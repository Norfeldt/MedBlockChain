import React, { Component } from 'react'

const SHA256 = require('crypto-js/sha256')

import { getHashOfDrugData } from './cloudComputing/Block'
import Blockchain from './cloudComputing/Blockchain'

// Using the Context API used in react 16.3 - https://www.youtube.com/watch?v=XLJN4JfniH4
const { Provider, Consumer: ContextConsumer } = React.createContext()

class ContextProvider extends Component {
  constructor(props) {
    super(props)

    const manufacture = 'Rantanen Labs'
    const drugData = this.getDefaultDrugData(manufacture)
    this.state = {
      blockchain: new Blockchain(),
      drugData,
      drugDataHash: getHashOfDrugData(drugData),
      drugMetaData: {
        manufacture,
      },
      manufacturedDrugs: [],
      patientDrugHistory: [],
    }
  }

  componentDidMount() {
    // TODO: Consider if AsyncStorage is needed.. This is just a Proof-of-Concept
    this.setupDemoChain()
  }

  makeHashSalt = () =>
    SHA256(Math.random().toString())
      .toString()
      .slice(0, 5)
      .toUpperCase() +
    ' ' +
    SHA256(Math.random().toString())
      .toString()
      .slice(0, 5)
      .toUpperCase()

  getDefaultDrugData = (
    manufacture,
    productionDate = new Date().toISOString(),
    hashSalt = this.makeHashSalt()
  ) => {
    return {
      manufacture,
      productionDate,
      hashSalt,
      ActivePharmIngredient: '4.25 mg',
    }
  }

  getDoseRange = () => ({ minDose: 0, maxDose: 20 })

  getDose = () =>
    parseFloat(
      this.state.drugData.ActivePharmIngredient.replace(/[^\d\.]*/g, '')
    ) // convert the dose from string to number - keeping it as string in order to preserve measuring units

  setDose = value => {
    // Grab a copy of the drug data in the state
    const { drugData } = { ...this.state }
    // Update the dose (string)
    drugData.ActivePharmIngredient =
      value.toFixed(2) + drugData.ActivePharmIngredient.replace(/[\d\.]*/g, '')
    // Update the production date and create new hash
    drugData.productionDate = new Date().toISOString()
    drugData.hashSalt = this.makeHashSalt()
    // Update the state
    this.setState({ drugData })
  }

  setupDemoChain() {
    // Grab a mutable copy of the blockchain
    const { blockchain, manufacturedDrugs, patientDrugHistory } = {
      ...this.state,
    }

    // Manufacturer CHECK IN 1st produced drug
    // Will be using Blockchain.addBlock() instead of checkIN() or checkOUT() because timestamp is needed
    const { manufacture } = this.state.drugMetaData
    let timestamp = new Date(2018, 7, 1, 9)
    let hashSalt = 'AODAD 9A13A'
    const drugData01 = this.getDefaultDrugData(manufacture, timestamp, hashSalt)
    manufacturedDrugs.unshift(drugData01)
    blockchain.addBlock({
      drugData: null,
      drugDataHash: getHashOfDrugData(drugData01),
      drugMetaData: { manufacture },
      timestamp,
    })

    //// Patient CHECK OUT 1st produced drug
    timestamp = new Date(2018, 7, 3, 16)
    blockchain.addBlock({
      drugData: drugData01,
      drugDataHash: null,
      drugMetaData: {
        PatientID:
          '1CA71187ECCBCE79E1F0272B74DCD1538335E4679A37D0ACF4A4C59D13461D54',
      },
      timestamp,
    })
    // FIXME: Add to PatientScreen
    patientDrugHistory.unshift({ dateTaken: timestamp, drugData: drugData01 })

    //// Manufacturer CHECK IN 2nd produced drug
    timestamp = new Date(2018, 7, 4, 9)
    hashSalt = 'F45CC ABC99'
    const drugData02 = this.getDefaultDrugData(manufacture, timestamp, hashSalt)
    manufacturedDrugs.unshift(drugData02)
    blockchain.addBlock({
      drugData: null,
      drugDataHash: getHashOfDrugData(drugData02),
      drugMetaData: { manufacture },
      timestamp,
    })

    this.setState({ blockchain, manufacturedDrugs, patientDrugHistory })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          getDose: this.getDose,
          getDoseRange: this.getDoseRange,
          setDose: this.setDose,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

module.exports = { ContextConsumer, ContextProvider }
