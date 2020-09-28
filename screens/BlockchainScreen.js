import map from 'lodash/map'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Header from '../components/basic/Header'
import BlockCard from '../components/BlockCard'
import SourceCodeLink from '../components/SourceCodeLink'
import Colors from '../constants/Colors'
import { ContextConsumer } from '../Context'

export default function BlockchainScreen(props) {
    return (
      <ContextConsumer>
        {({ blockchain }) => {
          return (
            <ScrollView style={blockStyle.scrollView}>
              {map(blockchain.chain, (block, index) => (
                <View style={blockStyle.scrollItem} key={block.blockHash}>
                  <BlockCard
                    index={index}
                    blockHash={block.blockHash}
                    timestamp={block.timestamp}
                    productDataHash={block.productDataHash}
                    previousBlockHash={block.previousBlockHash}
                    productData={block.productData}
                    drugMetaData={block.drugMetaData}
                    previousBlockInfo={block.previousBlockInfo}
                    hashAlgorithmName={block.hashAlgorithmName}
                    multipleCheckOUT={blockchain.falsifiedMedicine.multipleCheckOUT.has(
                      block.productDataHash
                    )}
                    neverCheckedIN={blockchain.falsifiedMedicine.neverCheckedIN.has(
                      block.productDataHash
                    )}
                  />
                </View>
              )).reverse()}
              <SourceCodeLink />
              <View style={{ height: 30 }} />
            </ScrollView>
          )
        }}
      </ContextConsumer>
    )
}

BlockchainScreen['navigationOptions'] = screenprops => ({
  header: () => <Header title="Blockchain" />
});

const blockStyle = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
    marginVertical: 0,
    backgroundColor: Colors.scrollBG,
  },
  scrollItem: { flexDirection: 'row', justifyContent: 'center' },
})
