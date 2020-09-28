import React from 'react'
import { View } from 'react-native'
import Colors, { getHashColors } from '../../constants/Colors'
import HashBlock from '../basic/HashBlock'
import Text from '../basic/Text'

export default function componentName(props) {
    const {
      hashAlgorithmName,
      timestamp,
      productDataHash,
      previousBlockHash,
      hash,
    } = props

    const shortStr = str =>
      `${str.slice(0, 3)}...${str.slice(str.length - 3, str.length)}`

    return (
      <View>
        <Text type="h4">BLOCK HASH</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text type="code">{hashAlgorithmName}(</Text>

          <Text type="code" style={{ backgroundColor: Colors.passiveBG }}>
            {shortStr(timestamp)}
          </Text>

          <Text type="code" style={getHashColors(productDataHash)}>
            {shortStr(productDataHash)}
          </Text>

          <Text type="code" style={getHashColors(previousBlockHash)}>
            {shortStr(previousBlockHash)}
          </Text>

          <Text type="code">)</Text>
        </View>
        <HashBlock value={hash} />
      </View>
    )
}
