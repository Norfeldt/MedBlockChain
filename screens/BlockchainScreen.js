import React, { PureComponent } from 'react'
import { StyleSheet, View, FlatList, ScrollView } from 'react-native'

import map from 'lodash/map'

import Header from '../components/basic/Header'
import BlockCard from '../components/BlockCard'

import Blockchain from '../cloudComputing/Blockchain'

import Colors from '../constants/Colors'

export default class BlockchainScreen extends PureComponent {
  static navigationOptions = {
    header: <Header title="Blockchain" />,
  }

  render() {
    const BC = new Blockchain() // FIXME: pass by prop or use Context API

    return (
      <ScrollView
        style={{ flex: 1, paddingTop: 10, backgroundColor: Colors.scrollBG }}
      >
        {map(BC.chain, block => (
          <View
            style={{ flexDirection: 'row', justifyContent: 'center' }}
            key={block.blockHash}
          >
            <BlockCard
              blockHash={block.blockHash}
              timestamp={block.timestamp}
              drugDataHash={block.drugDataHash}
              previousBlockHash={block.previousBlockHash}
              drugData={block.drugData}
              drugMetaData={block.drugMetaData}
              previousBlockInfo={block.previousBlockInfo}
            />
          </View>
        ))}
      </ScrollView>
    )
  }
}
