const SHA256 = require('crypto-js/sha256')

getHashOfDrugData = drugData => {
  return SHA256(JSON.stringify(drugData))
    .toString()
    .toUpperCase()
}

class Block {
  constructor({
    drugData,
    drugDataHash,
    drugMetaData,
    previousBlockHash,
    previousBlockInfo,
    timestamp,
  }) {
    this.timestamp = timestamp
      ? timestamp.toISOString()
      : new Date().toISOString()
    this.drugData = drugData
    this.drugMetaData = drugMetaData
    this.previousBlockHash = previousBlockHash
    this.previousBlockInfo = previousBlockInfo

    this.hashAlgorithmName = 'SHA256'
    this.drugDataHash = drugDataHash
      ? drugDataHash
      : getHashOfDrugData(drugData)
    this.blockHash = SHA256(
      this.timestamp + this.drugDataHash + this.previousBlockHash
    )
      .toString()
      .toUpperCase()
  }
}

module.exports = { Block, getHashOfDrugData }
