import React from 'react'
import { StyleSheet, View } from 'react-native'

import Header from '../components/basic/Header'
import BlockCard from '../components/BlockCard'

export default class BlockchainScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Blockchain" />,
  }

  render() {
    return (
      <View style={styles.container}>
        <BlockCard
          previousHash={
            'F1A2583273AE26E28D8E509FEEBF2BBBF9A6D0C1D0B589B10FDA251D2E619CDA'
          }
          blockKeyHash={
            '3E48CF0DDCBF778CF2CCF231C2FFB8176C574C8A4BDF2B094F39471A3EDA531C'
          }
          blockHash={
            '6EBF41D311EE3BCA9D80EE05853530B0AC5FB323A75208769364A262DC9CB7E1'
          }
          previousHashInfo={{
            previousHash:
              'C2A1F6F411BABD19896A7EF944B3A9FC05D66E15C9122F26167450510FF38062',
            blockKeyHash:
              'BC7A03D7D1C603E9ADB05F89ECFCC58439399EFD87186C2A2C334A1CAD7D1F6C',
          }}
          blockKey={null}
          blockKeyInfo={{
            Manufacture: 'Jukka Labs',
          }}
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
