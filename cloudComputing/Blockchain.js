// Derived from https://www.youtube.com/watch?v=zVqczFZr124
const { Block, getHashOfDrugData } = require('./Block')
import SHA256 from 'crypto-js/sha256'

class Blockchain {
  constructor() {
    this.chain = [this.createGensisBlock()]

    // TODO: make a lookup table and consider how it can be added to the blockchain as well
    // https://stackoverflow.com/questions/48817283/searching-for-an-item-in-a-blockchain
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
        timestamp: new Date(2018, 6 - 1, 24, 12).toISOString(),
        previousBlockHash: hashNA,
        drugDataHash: hashNA,
      },
      timestamp: new Date(2018, 6 - 1, 24, 12),
    })
  }

  getLatestBlock() {
    return this.chain[0]
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
    this.chain = [blockToChain, ...this.chain]

    // TODO: Make it return a promise
  }

  // Only manufacturer with access token can call this method
  checkIN(drugDataHash, drugMetaData) {
    // Received content should be encryption with public and private keys: https://www.youtube.com/watch?v=GSIDS_lvRv4
    // TODO: Decrypt with authority private key

    // TODO: Decrypt with manufacturer public key

    // TODO: Check that the drugDataHash hasn't already been checked IN or OUT

    // Add the block to the chain
    this.addBlock(null, drugDataHash, drugMetaData, null) // TODO: Deal with promise handing..
  }

  // Public can call this method
  checkOUT(drugData, drugMetaData) {
    // Verify that the drug hash has been CHECKED IN
    // FIXME:

    // TODO: Consider if attempt should be added to the chain..
    // Current implementation does not add it

    // FIXME:
    // Check that the drugh has has not already been CHECKED OUT
    // Add it to the chain anyway - since it needs to be recorded

    this.addBlock(drugData, null, drugMetaData, null) // TODO: Deal with promise handing..
  }
}

module.exports = Blockchain
