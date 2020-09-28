import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import HashBlock, { styleHashBlock } from '../basic/HashBlock'
import Text from '../basic/Text'
import BlockHashVisualized from './BlockHashVisualized'

export default function ChainingInfo(props) {
    const {
      timestamp,
      previousBlockHash,
      productDataHash,
      hash,
      hashAlgorithmName,
    } = props
    return (
      <View
        style={{
          borderTopColor: Colors.passive,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text type="h4" style={{ paddingBottom: 0 }}>
          TIMESTAMP
        </Text>
        <View
          style={{
            backgroundColor: Colors.passiveBG,
            ...styleHashBlock,
          }}
        >
          <Text type="code">{timestamp}</Text>
        </View>

        <Text type="h4" style={{ paddingBottom: 0 }}>
          PRODUCT DATA HASH
        </Text>
        <HashBlock value={productDataHash} />

        <Text type="h4" style={{ paddingBottom: 0 }}>
          PREVIOUS HASH
        </Text>
        <HashBlock value={previousBlockHash} />

        <BlockHashVisualized
          hashAlgorithmName={hashAlgorithmName}
          timestamp={timestamp}
          productDataHash={productDataHash}
          previousBlockHash={previousBlockHash}
          hash={hash}
        />
      </View>
    )
}
