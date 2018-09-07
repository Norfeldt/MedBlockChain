import React, { PureComponent } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import map from 'lodash/map'

import { ContextConsumer } from '../Context'
import Header from '../components/basic/Header'
import BlockCard from '../components/BlockCard'

import Colors from '../constants/Colors'
import Card from '../components/basic/Card'
import Text from '../components/basic/Text'

export default class BlockchainScreen extends PureComponent {
  static navigationOptions = {
    header: <Header title="Blockchain" />,
  }

  render() {
    return (
      <ContextConsumer>
        {({ blockchain }) => {
          return (
            <ScrollView style={blockStyle.scrollView}>
              {map(blockchain.chain, block => (
                <View style={blockStyle.scrollItem} key={block.blockHash}>
                  <BlockCard
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
                  <Text>
                    {blockchain.falsifiedMedicine.neverCheckedIN.has(
                      block.productDataHash
                    )}
                  </Text>
                </View>
              )).reverse()}
              <Card
                style={{
                  alignSelf: 'center',
                  backgroundColor: Colors.passiveBG,
                }}
              >
                <Text type="code">VOID SPACE</Text>
              </Card>
              <View style={{ height: 10 }} />
            </ScrollView>
          )
        }}
      </ContextConsumer>
    )
  }
}

const blockStyle = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
    marginVertical: 0,
    backgroundColor: Colors.scrollBG,
  },
  scrollItem: { flexDirection: 'row', justifyContent: 'center' },
})
