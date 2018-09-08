import Conventions from '../constants/Conventions'
const SHA256 = require('crypto-js/sha256')

getHashOfproductData = productData => {
  return SHA256(JSON.stringify(productData))
    .toString()
    .toUpperCase()
}

class Block {
  constructor({
    productData,
    productDataHash,
    drugMetaData,
    previousBlockHash,
    previousBlockInfo,
    timestamp,
  }) {
    this.timestamp = timestamp
      ? Conventions.datetimeStr(timestamp)
      : Conventions.datetimeStr()
    this.productData = productData
    this.drugMetaData = drugMetaData
    this.previousBlockHash = previousBlockHash
    this.previousBlockInfo = previousBlockInfo

    this.hashAlgorithmName = 'SHA256'
    this.productDataHash = productDataHash
      ? productDataHash
      : getHashOfproductData(productData)
    this.blockHash = SHA256(
      this.timestamp + this.productDataHash + this.previousBlockHash
    )
      .toString()
      .toUpperCase()
  }
}

module.exports = { Block, getHashOfproductData }
