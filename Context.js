import React, { Component } from 'react'
import { getHashOfDrugData } from './cloudComputing/Block'
import Blockchain from './cloudComputing/Blockchain'
import Conventions from './constants/Conventions'
import remove from 'lodash/remove'

const SHA256 = require('crypto-js/sha256')

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
      genuineDrugs: [],
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
    productionDate = Conventions.datetimeStr(new Date()),
    hashSalt = this.makeHashSalt()
  ) => {
    return {
      manufacture,
      ActivePharmIngredient: 'Ephedrine',
      dose: '4.25 mg',
      productionDate,
      hashSalt,
    }
  }

  getDoseRange = () => ({ minDose: 0, maxDose: 20 })

  getDose = () => parseFloat(this.state.drugData.dose.replace(/[^\d\.]*/g, '')) // convert the dose from string to number - keeping it as string in order to preserve measuring units

  setDose = value => {
    // Grab a copy of the drug data in the state
    const { drugData } = { ...this.state }
    // Update the dose (string)
    drugData.dose = value.toFixed(2) + drugData.dose.replace(/[\d\.]*/g, '')
    // Update the production date and create new hash
    drugData.productionDate = Conventions.datetimeStr()
    drugData.hashSalt = this.makeHashSalt()

    // Make a new hash of the updated drug data
    const drugDataHash = getHashOfDrugData(drugData)
    // Update the state
    this.setState({ drugData, drugDataHash })
  }

  setupDemoChain() {
    // Grab a mutable copy of the blockchain
    const {
      blockchain,
      manufacturedDrugs,
      genuineDrugs,
      patientDrugHistory,
    } = {
      ...this.state,
    }

    // Manufacturer CHECK IN 1st produced drug
    // Will be using Blockchain.addBlock() instead of checkIN() or checkOUT() because timestamp is needed
    const { manufacture } = this.state.drugMetaData
    let timestamp = new Date(2018, 7, 1, 9)
    let hashSalt = 'AODAD 9A13A'
    const drugData01 = this.getDefaultDrugData(manufacture, timestamp, hashSalt)
    blockchain.addBlock({
      drugData: null,
      drugDataHash: getHashOfDrugData(drugData01),
      drugMetaData: { manufacture },
      timestamp,
    })

    // Update the records of manufactured and available drugs
    manufacturedDrugs.unshift(drugData01)
    genuineDrugs.unshift(drugData01)

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

    // Update the records of available drugs and drug taken history
    remove(genuineDrugs, drugData01)
    patientDrugHistory.unshift({ dateTaken: timestamp, drugData: drugData01 })

    //// Manufacturer CHECK IN 2nd produced drug
    timestamp = new Date(2018, 7, 4, 9)
    hashSalt = 'F45CC ABC99'
    const drugData02 = this.getDefaultDrugData(manufacture, timestamp, hashSalt)
    blockchain.addBlock({
      drugData: null,
      drugDataHash: getHashOfDrugData(drugData02),
      drugMetaData: { manufacture },
      timestamp,
    })

    // Update the records of manufactured and available drugs
    manufacturedDrugs.unshift(drugData02)
    genuineDrugs.unshift(drugData02)

    // Finally update the state
    this.setState({ blockchain, manufacturedDrugs, patientDrugHistory })
  }

  checkIN = () => {
    // Update the global blockchain (locally without mutating state)
    const { blockchain, drugMetaData } = { ...this.state }
    let { drugDataHash } = { ...this.state }
    blockchain.checkIN({ drugDataHash, drugMetaData })

    // Update the list of manufactured drugs
    const { manufacturedDrugs, drugData } = { ...this.state }
    manufacturedDrugs.unshift({ ...drugData })

    // Update the list of genuine available drugs
    const { genuineDrugs } = { ...this.state }
    genuineDrugs.unshift({ ...drugData })

    // Reset production date and hash salt
    drugData.productionDate = Conventions.datetimeStr()
    drugData.hashSalt = this.makeHashSalt()
    drugDataHash = getHashOfDrugData({ ...drugData })

    // Update the state
    this.setState({
      blockchain,
      drugData,
      drugDataHash,
      manufacturedDrugs,
      genuineDrugs,
    })
  }

  checkOUT = drugData => {
    // Get a copy of the blockchain and state records
    const { blockchain, genuineDrugs, patientDrugHistory } = { ...this.state }
    blockchain.checkOUT({ drugData })

    // Remove from available drugs
    remove(genuineDrugs, drugData)

    // Add to drug taken history
    const dateTaken = new Date()
    patientDrugHistory.unshift({ dateTaken, drugData })

    this.setState({ blockchain, genuineDrugs, patientDrugHistory })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          getDose: this.getDose,
          getDoseRange: this.getDoseRange,
          setDose: this.setDose,
          checkIN: this.checkIN,
          checkOUT: this.checkOUT,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

module.exports = { ContextConsumer, ContextProvider }
