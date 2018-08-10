const SHA256 = require('crypto-js/sha256')

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

    this.hashFunctionName = 'SHA256'
    // FIXME: allow to CHECK IN and not just check out
    this.drugDataHash = drugDataHash
      ? drugDataHash
      : SHA256(JSON.stringify(drugData))
          .toString()
          .toUpperCase()
    this.blockHash = SHA256(
      this.timestamp + this.drugDataHash + this.previousBlockHash
    )
      .toString()
      .toUpperCase()
  }
}

module.exports = Block
