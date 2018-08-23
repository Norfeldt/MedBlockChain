import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Colors, { getHashColors } from '../../constants/Colors'
import HashBlock from '../basic/HashBlock'
import Text from '../basic/Text'

export default class componentName extends PureComponent {
  render() {
    const {
      hashAlgorithmName,
      timestamp,
      drugDataHash,
      previousBlockHash,
      hash,
    } = this.props

    shortStr = str =>
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

          <Text type="code" style={{ backgroundColor: Colors.timestampBG }}>
            {shortStr(timestamp)}
          </Text>

          <Text type="code" style={getHashColors(drugDataHash)}>
            {shortStr(drugDataHash)}
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
}
