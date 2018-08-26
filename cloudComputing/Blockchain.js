// Derived from https://www.youtube.com/watch?v=zVqczFZr124
const { Block, getHashOfDrugData } = require('./Block')
import SHA256 from 'crypto-js/sha256'
import { datetimeStr } from '../constants/Conventions'

class Blockchain {
  constructor() {
    this.chain = [this.createGensisBlock()]

    // TODO: make a lookup table and consider how it can be added to the blockchain as well
    // https://stackoverflow.com/questions/48817283/searching-for-an-item-in-a-blockchain
    this.findCheckIN = {}
    this.findCheckOUT = {}

    // Falsified medicine
    this.falsifiedMedicine = {
      multipleCheckOUT: new Set(),
      neverCheckedIN: new Set(),
    }
  }

  createGensisBlock() {
    // TODO: Confirm that it's SHA256 that is being used in the blocks..

    const hashNA = SHA256('N/A')
      .toString()
      .toUpperCase()
    // Block( drugData, drugMetaData, previousBlockHash, previousBlockInfo, timestamp)
    return new Block({
      drugData: null,
      drugDataHash: null,
      drugMetaData: { BlockCreator: 'Authorized Unit' },
      previousBlockHash: SHA256('N/A' + hashNA + hashNA)
        .toString()
        .toUpperCase(),
      previousBlockInfo: {
        timestamp: datetimeStr(new Date(2018, 6 - 1, 24, 12)),
        previousBlockHash: hashNA,
        drugDataHash: hashNA,
      },
      timestamp: datetimeStr(new Date(2018, 6 - 1, 24, 12)),
    })
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // Only authorized unit can call this method
  addBlock({ drugData, drugDataHash, drugMetaData, timestamp }) {
    // Build block info for the latest block
    const previousBlockInfo = {
      timestamp: this.getLatestBlock().timestamp,
      drugDataHash: this.getLatestBlock().drugDataHash,
      previousBlockHash: this.getLatestBlock().previousBlockHash,
    }

    // Build the block to chain
    // Block( drugData, drugMetaData, previousBlockHash, previousBlockInfo [, timestamp])
    const blockToChain = new Block({
      drugData,
      drugDataHash,
      drugMetaData,
      previousBlockHash: this.getLatestBlock().blockHash,
      previousBlockInfo,
      timestamp,
    })

    // Add the block to the chain
    this.chain.push(blockToChain)

    // Update the "lookup tables"/"search engines"
    const index = this.chain.length - 1
    const hash = blockToChain.drugDataHash
    const { multipleCheckOUT, neverCheckedIN } = this.falsifiedMedicine
    // Check IN case - this.checkIN only allows one
    if (drugData == null) {
      this.findCheckIN[hash] = index
    }
    // Check OUT case - multiple checkout are possible and indicate falsified medicine
    else {
      // Before adding it, check of multiple occurances
      if (!this.findCheckOUT.hasOwnProperty(hash)) {
        this.findCheckOUT[hash] = []
      } else {
        // WARNING this drug has been checked OUT multiple times
        multipleCheckOUT.add(hash)
      }
      // Add this occurance
      this.findCheckOUT[hash].push(index)

      // WARNING this drug has never been checked IN by an authorized manufacturer
      if (!this.findCheckIN.hasOwnProperty(hash)) {
        neverCheckedIN.add(hash)
      }
    }

    // TODO: Make it return a promise
  }

  // Only manufacturer with access token can call this method
  checkIN({ drugDataHash, drugMetaData }) {
    // Received content should be encryption with public and private keys: https://www.youtube.com/watch?v=GSIDS_lvRv4
    // TODO: Decrypt with authority private key

    // TODO: Decrypt with manufacturer public key

    // Check that the drugDataHash hasn't already been checked IN
    if (!this.findCheckIN.hasOwnProperty(drugDataHash)) {
      // Add the block to the chain
      this.addBlock({
        drugData: null,
        drugDataHash,
        drugMetaData,
        timestamp: null,
      })
      // TODO: return promise succesful
    } else {
      // TODO: return promise failed
    }
  }

  // Public can call this method
  checkOUT(drugData) {
    // Verify that the drug hash has been CHECKED IN
    // FIXME:

    // TODO: Consider if attempt should be added to the chain..
    // Current implementation does not add it

    // FIXME:
    // Check that the drugh has has not already been CHECKED OUT
    // Add it to the chain anyway - since it needs to be recorded

    this.addBlock(drugData, null, null, null) // TODO: Deal with promise handing..
  }
}

module.exports = Blockchain
