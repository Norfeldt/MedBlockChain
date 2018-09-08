import React, { Component } from 'react'
import { getHashOfproductData } from './cloudComputing/Block'
import Blockchain from './cloudComputing/Blockchain'
import Conventions from './constants/Conventions'
import remove from 'lodash/remove'

const SHA256 = require('crypto-js/sha256')

// Using the Context API used in react 16.3 - https://www.youtube.com/watch?v=XLJN4JfniH4
const { Provider, Consumer: ContextConsumer } = React.createContext()

class ContextProvider extends Component {
  constructor(props) {
    super(props)

    const productionUnit = 'CPHarma'
    const productData = this.getDefaultproductData(productionUnit)
    this.state = {
      blockchain: new Blockchain(),
      productData,
      productDataHash: getHashOfproductData(productData),
      drugMetaData: {
        productionUnit,
      },
      manufacturedDrugs: [],
      genuineDrugs: [],
      patientDrugHistory: [],
      prescriptionDose: [0, 100, 0],
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

  getDefaultproductData = (
    productionUnit,
    productionTime = Conventions.datetimeStr(new Date()),
    hashSalt = this.makeHashSalt()
  ) => {
    return {
      productionUnit,
      compound: 'rosuvastatin',
      dose: '5 mg',
      productionTime:
        typeof productionTime == 'string'
          ? productionTime
          : Conventions.datetimeStr(productionTime),
      hashSalt,
    }
  }

  getDoseRange = () => ({ minDose: 0, maxDose: 40 })

  getDose = () =>
    parseFloat(this.state.productData.dose.replace(/[^\d\.]*/g, '')) // convert the dose from string to number - keeping it as string in order to preserve measuring units

  setDose = value => {
    // Grab a copy of the PRODUCT DATA in the state
    const { productData } = { ...this.state }
    // Update the dose (string)
    productData.dose =
      value.toFixed(0) + productData.dose.replace(/[\d\.]*/g, '')
    // Update the production date and create new hash
    productData.productionTime = Conventions.datetimeStr()
    productData.hashSalt = this.makeHashSalt()

    // Make a new hash of the updated PRODUCT DATA
    const productDataHash = getHashOfproductData(productData)
    // Update the state
    this.setState({ productData, productDataHash })
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
    const { productionUnit } = this.state.drugMetaData
    let timestamp = new Date(2018, 7, 1, 9)
    let hashSalt = 'A8DAD 9A13A'
    const productData01 = this.getDefaultproductData(
      productionUnit,
      timestamp,
      hashSalt
    )
    blockchain.addBlock({
      productData: null,
      productDataHash: getHashOfproductData(productData01),
      drugMetaData: { productionUnit },
      timestamp,
    })

    // Update the records of manufactured and available drugs
    manufacturedDrugs.unshift(productData01)
    genuineDrugs.unshift(productData01)

    //// Patient CHECK OUT 1st produced drug
    timestamp = new Date(2018, 7, 3, 16)
    blockchain.addBlock({
      productData: productData01,
      productDataHash: null,
      drugMetaData: {
        PatientID:
          '1CA71187ECCBCE79E1F0272B74DCD1538335E4679A37D0ACF4A4C59D13461D54',
      },
      timestamp,
    })

    // Update the records of available drugs and drug taken history
    remove(genuineDrugs, productData01)
    patientDrugHistory.push({
      dateTaken: timestamp,
      productData: productData01,
    })

    //// Manufacturer CHECK IN 2nd produced drug
    timestamp = new Date(2018, 8, 4, 14)
    hashSalt = 'ABC99 ABC99'
    const productData02 = this.getDefaultproductData(
      productionUnit,
      timestamp,
      hashSalt
    )
    blockchain.addBlock({
      productData: null,
      productDataHash: getHashOfproductData(productData02),
      drugMetaData: { productionUnit },
      timestamp,
    })

    // Update the records of manufactured and available drugs
    manufacturedDrugs.push(productData02)
    genuineDrugs.push(productData02)

    // Finally update the state
    this.setState({ blockchain, manufacturedDrugs, patientDrugHistory })
  }

  checkIN = () => {
    // Update the global blockchain (locally without mutating state)
    const { blockchain, drugMetaData } = { ...this.state }
    let { productDataHash } = { ...this.state }
    blockchain.checkIN({ productDataHash, drugMetaData })

    // Update the list of manufactured drugs
    const { manufacturedDrugs, productData } = { ...this.state }
    manufacturedDrugs.push({ ...productData })

    // Update the list of genuine available drugs
    const { genuineDrugs } = { ...this.state }
    genuineDrugs.push({ ...productData })

    // Reset production date and hash salt
    productData.productionTime = Conventions.datetimeStr()
    productData.hashSalt = this.makeHashSalt()
    productDataHash = getHashOfproductData({ ...productData })

    // Update the state
    this.setState({
      blockchain,
      productData,
      productDataHash,
      manufacturedDrugs,
      genuineDrugs,
    })
  }

  checkOUT = (productData, falsified) => {
    // Get a copy of the blockchain and state records
    const { blockchain, genuineDrugs, patientDrugHistory } = { ...this.state }
    blockchain.checkOUT({ productData })

    // Remove from available drugs
    if (!falsified) {
      remove(genuineDrugs, productData)
    }

    // Add to drug taken history
    const dateTaken = new Date()
    patientDrugHistory.unshift({ dateTaken, productData })

    this.setState({ blockchain, genuineDrugs, patientDrugHistory })
  }

  updatePrescriptionDose = (left, right) => {
    let [leftFlex, middleFlex, rightFlex] = [...this.state.prescriptionDose]

    this.setState({
      prescriptionDose: [
        leftFlex + (left || 0),
        middleFlex,
        rightFlex + (right || 0),
      ],
    })
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
          getFalsifiedDrug: this.getDefaultproductData,
          updatePrescriptionDose: this.updatePrescriptionDose,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

module.exports = { ContextConsumer, ContextProvider }
