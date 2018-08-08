// Derived from https://www.youtube.com/watch?v=zVqczFZr124
const Block = require('./Block')
const SHA256 = require('crypto-js/sha256')

class Blockchain {
  constructor() {
    // Block( blockKey, blockKeyInfo, previousHash, previousHashInfo)
    const genesisBlock = new Block(
      { initialBlockInBlockChain: true },
      { manufacturer: 'Authorized Unit' },
      SHA256('N/A' + SHA256('N/A').toString() + SHA256('N/A').toString())
        .toString()
        .toUpperCase(),
      {
        timestamp: 'N/A',
        previousHash: SHA256('N/A')
          .toString()
          .toUpperCase(),
        blockKeyHash: SHA256('N/A')
          .toString()
          .toUpperCase(),
      }
    )
    this.chain = [genesisBlock]

    // https://stackoverflow.com/questions/48817283/searching-for-an-item-in-a-blockchain
    this.lookupTable = {}
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // Only authorized unit can call this method
  addBlock(blockKey, blockKeyInfo) {
    const {
      blockHash: previousHash,
      timestamp,
      blockKeyHash,
      previousHash: ppHash,
    } = this.getLatestBlock()

    const previousBlockInfo = {
      timestamp,
      blockKeyHash,
      previousHash: ppHash,
    }
    const blockToChain = new Block(
      blockKey,
      blockKeyInfo,
      previousHash,
      previousBlockInfo
    )
    this.chain.push(blockToChain)

    // TODO: Make it return a promise
  }

  // Only manufacturer with access token can call this method
  checkIN(blockKey, blockKeyInfo) {
    // Received content should be encryption with public and private keys: https://www.youtube.com/watch?v=GSIDS_lvRv4
    // TODO: Decrypt with authority private key

    // TODO: Decrypt with manufacturer public key

    // TODO: Check for hash value collision before CHECK IN

    // Add the block to the chain
    this.addBlock(blockKey, blockKeyInfo) // TODO: Deal with promise handing..
  }

  // Public can call this method
  checkOUT(blockToChain) {
    // No matter if the drug is genuine or falisified - it's attempt to be checked out will be recorded

    // TODO: Consider if the same end-user ID should be able to check-out twice the same

    this.addBlock(blockToChain) // TODO: Deal with promise handing..

    // const previousChained = this.lookupTable[`${blockToChain.masterDataHash}`] // will be undefined if never chained before
    // if (previousChained) {
    //   if (previousChained.index.length == 1) {
    //     return {
    //       succes: 'THE DRUG IS CONSIDERED GENUINE',
    //     }
    //   } else {
    //     return {
    //       error:
    //         'WARNING: DO NOT CONSUME THIS DRUG!\n\nIt has already been CHECKED OUT and should therefore be considered as a falisifed medicine',
    //     }
    //   }
    // } else {
    //   return {
    //     error:
    //       'WARNING: DO NOT CONSUME THIS DRUG!\n\nIt has NOT been reported to be produced by an authorized manufacture and should therefore be considered as a falisifed medicine',
    //   }
    // }
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }

    return true
  }
}

module.exports = Blockchain
