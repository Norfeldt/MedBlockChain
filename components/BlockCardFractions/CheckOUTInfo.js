import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import HashBlock, { styleHashBlock } from '../basic/HashBlock'
import Text from '../basic/Text'
import BlockHashVisualized from './BlockHashVisualized'
import ListData from '../ListData'

export default class CheckOUTInfo extends PureComponent {
  render() {
    const { drugData, drugDataHash, hashAlgorithmName } = this.props
    return (
      <View
        style={{
          borderTopColor: Colors.passive,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text type="h4" style={{ paddingBottom: 0 }}>
          DRUG DATA
        </Text>
        <ListData data={drugData} />

        <HashBlock value={drugDataHash} />
      </View>
    )
  }
}
