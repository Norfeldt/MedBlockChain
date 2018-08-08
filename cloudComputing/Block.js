const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(blockKey, blockKeyInfo, previousHash, previousBlockInfo) {
    this.timestamp = new Date().toISOString()
    this.blockKey = blockKey
    this.blockKeyInfo = blockKeyInfo
    this.previousHash = previousHash
    this.previousBlockInfo = previousBlockInfo

    this.hashFunctionName = 'SHA256'
    this.blockKeyHash = SHA256(JSON.stringify(blockKey))
      .toString()
      .toUpperCase()
    this.blockHash = SHA256(
      this.timestamp + this.blockKeyHash + this.previousHash
    )
      .toString()
      .toUpperCase()
  }
}

module.exports = Block
