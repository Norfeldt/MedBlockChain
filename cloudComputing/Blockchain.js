// Derived from https://www.youtube.com/watch?v=zVqczFZr124
const Block = require('./Block')
const SHA256 = require('crypto-js/sha256')

class Blockchain {
  constructor() {
    this.chain = [this.createGensisBlock()]

    // TODO: make a lookup table and consider how it can be added to the blockchain as well
    // https://stackoverflow.com/questions/48817283/searching-for-an-item-in-a-blockchain

    // DEMO CHAIN - Adding some demonstration blocks to the chain
    // Will be using addBlock() instead of checkIN() or checkOUT() because timestamp is needed

    //// Manufacturer CHECK IN 1st produced drug
    // FIXME: use/get data matching Manufacture screen produced
    this.addBlock({
      drugData: null,
      drugDataHash: this.getHashOf({ DrugADose: 100 }),
      drugMetaData: { Manufacture: 'Jukka Labs' },
      timestamp: new Date(2018, 6 - 1, 30),
    })

    //// Patient CHECK OUT 1st produced drug
    this.addBlock({
      drugData: { Manufacture: 'Jukka Labs', DrugADose: 100 },
      drugDataHash: null,
      drugMetaData: {
        PatintID:
          '1CA71187ECCBCE79E1F0272B74DCD1538335E4679A37D0ACF4A4C59D13461D54',
      },
      timestamp: new Date(2018, 7 - 1, 3),
    })

    //// Manufacturer CHECK IN 2nd produced drug
    this.addBlock({
      drugData: null,
      drugDataHash: this.getHashOf({ DrugADose: 80 }),
      drugMetaData: { Manufacture: 'Jukka Labs' },
      timestamp: new Date(2018, 7 - 1, 4),
    })
  }

  createGensisBlock() {
    const hashNA = this.getHashOf('N/A')
    // Block( drugData, drugMetaData, previousBlockHash, previousBlockInfo, timestamp)
    return new Block({
      drugData: null,
      drugDataHash: null,
      drugMetaData: { BlockCreator: 'Authorized Unit' },
      previousBlockHash: this.getHashOf('N/A' + hashNA + hashNA),
      previousBlockInfo: {
        timestamp: new Date(2018, 6 - 1, 24).toISOString(),
        previousBlockHash: hashNA,
        drugDataHash: hashNA,
      },
      timestamp: new Date(2018, 6 - 1, 24),
    })
  }

  getHashOf(key) {
    return SHA256(key)
      .toString()
      .toUpperCase()
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
