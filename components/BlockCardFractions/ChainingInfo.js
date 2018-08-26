import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import HashBlock, { styleHashBlock } from '../basic/HashBlock'
import Text from '../basic/Text'
import BlockHashVisualized from './BlockHashVisualized'

export default class ChainingInfo extends PureComponent {
  render() {
    const {
      timestamp,
      previousBlockHash,
      drugDataHash,
      hash,
      hashAlgorithmName,
    } = this.props
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
          DRUG DATA HASH
        </Text>
        <HashBlock value={drugDataHash} />

        <Text type="h4" style={{ paddingBottom: 0 }}>
          PREVIOUS HASH
        </Text>
        <HashBlock value={previousBlockHash} />

        <BlockHashVisualized
          hashAlgorithmName={hashAlgorithmName}
          timestamp={timestamp}
          drugDataHash={drugDataHash}
          previousBlockHash={previousBlockHash}
          hash={hash}
        />
      </View>
    )
  }
}
