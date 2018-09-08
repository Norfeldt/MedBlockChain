// Derived from https://www.youtube.com/watch?v=zVqczFZr124
const { Block, getHashOfproductData } = require('./Block')
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

    const timestamp = datetimeStr(new Date(2018, 6 - 1, 24, 12))
    // Block( productData, drugMetaData, previousBlockHash, previousBlockInfo, timestamp)
    return new Block({
      productData: null,
      productDataHash: null,
      drugMetaData: { BlockCreator: 'Authorized Unit' },
      previousBlockHash: SHA256(timestamp + hashNA + hashNA)
        .toString()
        .toUpperCase(),
      previousBlockInfo: {
        timestamp,
        previousBlockHash: hashNA,
        productDataHash: hashNA,
      },
      timestamp,
    })
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // Only authorized unit can call this method
  addBlock({ productData, productDataHash, drugMetaData, timestamp }) {
    // Build block info for the latest block
    const previousBlockInfo = {
      timestamp: this.getLatestBlock().timestamp,
      productDataHash: this.getLatestBlock().productDataHash,
      previousBlockHash: this.getLatestBlock().previousBlockHash,
    }

    // Build the block to chain
    // Block( productData, drugMetaData, previousBlockHash, previousBlockInfo [, timestamp])
    const blockToChain = new Block({
      productData,
      productDataHash,
      drugMetaData,
      previousBlockHash: this.getLatestBlock().blockHash,
      previousBlockInfo,
      timestamp,
    })

    // Add the block to the chain
    this.chain.push(blockToChain)

    // Update the "lookup tables"/"search engines"
    const index = this.chain.length - 1
    const hash = blockToChain.productDataHash
    const { multipleCheckOUT, neverCheckedIN } = this.falsifiedMedicine
    // Check IN case - this.checkIN only allows one
    if (productData == null) {
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
  checkIN({ productDataHash, drugMetaData }) {
    // Received content should be encryption with public and private keys: https://www.youtube.com/watch?v=GSIDS_lvRv4
    // TODO: Decrypt with authority private key

    // TODO: Decrypt with manufacturer public key

    // Check that the productDataHash hasn't already been checked IN
    if (!this.findCheckIN.hasOwnProperty(productDataHash)) {
      // Add the block to the chain
      this.addBlock({
        productData: null,
        productDataHash,
        drugMetaData,
        timestamp: null,
      })
      // TODO: return promise succesful
    } else {
      // TODO: return promise failed
    }
  }

  // Public can call this method
  checkOUT(productData) {
    // TODO: Alert if the drug has not been CHECKED IN

    // TODO: Alert if the drug already has been CHECKED OUT

    this.addBlock(productData, null, null, null) // TODO: Deal with promise handing..
  }
}

module.exports = Blockchain
