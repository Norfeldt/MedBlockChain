import React from 'react'
import { StyleSheet, View } from 'react-native'

import Header from '../components/basic/Header'
import BlockCard from '../components/BlockCard'

import Blockchain from '../cloudComputing/Blockchain'

export default class BlockchainScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Blockchain" />,
  }

  render() {
    const BC = new Blockchain()
    console.log(JSON.stringify(BC, null, 4))
    BC.checkIN(
      { manufacturer: 'Jukka Labs', doseAQuantity: 100, doseAUnits: 'mg' },
      { manufacturer: 'Jukka Labs' }
    )

    console.log(JSON.stringify(BC, null, 4))

    const {
      blockHash,
      timestamp,
      blockKeyHash,
      previousHash,
      blockKey,
      blockKeyInfo,
      previousBlockInfo,
    } = BC.getLatestBlock()

    return (
      <View style={styles.container}>
        <BlockCard
          blockHash={blockHash}
          timestamp={timestamp}
          blockKeyHash={blockKeyHash}
          previousHash={previousHash}
          blockKey={blockKey}
          blockKeyInfo={blockKeyInfo}
          previousBlockInfo={previousBlockInfo}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
