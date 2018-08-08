import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  LayoutAnimation,
} from 'react-native'

import invert from 'invert-color'
import { reduce, trim, lowerCase, capitalize } from 'lodash'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Card from './basic/Card'
import FontIcon from './basic/FontIcon'
import InfoRow from './basic/InfoRow'

import Colors from '../constants/Colors'

export default class BlockCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBlockInfo: null,
    }
  }

  render() {
    const {
      blockHash,
      timestamp,
      blockKeyHash,
      previousHash,
      blockKey,
      blockKeyInfo,
    } = this.props

    BlockButton = ({ style, title, hash }) => (
      <TouchableOpacity
        style={[hashBlockContainer(hash), blockStyle.shadow, style]}
        onPress={() => {
          this.setState({
            showBlockInfo: this.state.showBlockInfo == title ? null : title,
          })
        }}
      >
        <Text
          style={[
            textStyle.subheader,
            { color: invert(`#${hash.slice(0, 6)}`, true) },
          ]}
        >
          {title}
        </Text>
        <Text style={hashBlockText(hash)}>{`${hash.slice(0, 10)}...`}</Text>
      </TouchableOpacity>
    )

    BlockHash = ({ hash = '00ff00', style }) => (
      <View
        style={[
          { borderRadius: 7, backgroundColor: `#${hash.slice(0, 6)}` },
          style,
        ]}
      >
        <Text
          style={[
            textStyle.hash,
            {
              color: invert(`#${hash.slice(0, 6)}`, true),
              padding: 10,
            },
          ]}
        >{`${trim(hash.replace(/(.{32})/g, '$1\n'))}`}</Text>
      </View>
    )

    ChainingInfo = ({ timestamp, previousHash, blockKeyHash, hash }) => (
      <View style={blockStyle.blockInfo}>
        <Text style={textStyle.subheader}>TIMESTAMP</Text>

        <View style={hashBlockContainer(Colors.headerLine.slice(1, 7))}>
          <Text
            style={[
              hashBlockText('ffffff'),
              { backgroundColor: 'transparent' },
            ]}
          >
            {timestamp}
          </Text>
        </View>

        <Text style={textStyle.subheader}>PREVIOUS HASH</Text>
        <BlockHash hash={previousHash} />

        <Text style={textStyle.subheader}>BLOCK KEY HASH</Text>
        <BlockHash hash={blockKeyHash} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 5,
          }}
        >
          <Text style={textStyle.subheader}>SHA256(</Text>

          <Text style={hashBlockText(Colors.headerLine.slice(1, 7))}>
            {`${timestamp.slice(0, 3)}...${timestamp.slice(
              timestamp.length - 3,
              timestamp.length
            )}`}
          </Text>

          <Text style={hashBlockText(previousHash)}>{`${previousHash.slice(
            0,
            3
          )}...${previousHash.slice(64 - 3, 64)}`}</Text>

          <Text style={hashBlockText(blockKeyHash)}>{`${blockKeyHash.slice(
            0,
            3
          )}...${blockKeyHash.slice(64 - 3, 64)}`}</Text>

          <Text style={textStyle.subheader}>)</Text>
        </View>
        <BlockHash hash={hash} />
      </View>
    )

    BlockInfo = () => {
      const { showBlockInfo } = this.state

      if (showBlockInfo !== null) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      }

      switch (showBlockInfo) {
        case 'PREVIOUS HASH':
          return (
            <ChainingInfo
              timestamp={this.props.previousBlockInfo.timestamp}
              previousHash={this.props.previousBlockInfo.previousHash}
              blockKeyHash={this.props.previousBlockInfo.blockKeyHash}
              hash={this.props.previousHash}
            />
          )

        case 'BLOCK KEY HASH':
          if (blockKey) {
            const key = JSON.stringify(blockKey)
            return (
              <View style={blockStyle.blockInfo}>
                {reduce(
                  blockKey,
                  (acc, value, key) => {
                    acc = [
                      ...acc,
                      <InfoRow
                        key={key}
                        setting={lowerCase(key)
                          .split(' ')
                          .map(word => capitalize(word))
                          .join(' ')}
                        value={value}
                      />,
                    ]
                    return acc
                  },
                  []
                )}

                <View
                  style={{
                    backgroundColor: Colors.headerLine,
                    borderRadius: 7,
                    padding: 10,
                  }}
                >
                  <Text style={textStyle.hash}>{key}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 5,
                  }}
                >
                  <Text style={textStyle.subheader}>SHA256(</Text>

                  <Text
                    style={[
                      textStyle.hash,
                      { backgroundColor: Colors.headerLine },
                    ]}
                  >{`${key.slice(0, 10)}...${key.slice(
                    key.length - 10,
                    key.length
                  )}`}</Text>

                  <Text style={textStyle.subheader}>)</Text>
                </View>

                <BlockHash hash={blockKeyHash} />
              </View>
            )
          } else {
            return (
              <View style={blockStyle.blockInfo}>
                <InfoRow
                  setting="Manufacture"
                  value={blockKeyInfo['Manufacture']}
                />

                <Text style={textStyle.subheader}>CHECKED IN</Text>

                <BlockHash hash={this.props.blockKeyHash} />
              </View>
            )
          }

        case 'BLOCK HASH':
          return (
            <ChainingInfo
              timestamp={this.props.timestamp}
              previousHash={this.props.previousHash}
              blockKeyHash={this.props.blockKeyHash}
              hash={this.props.blockHash}
            />
          )

        default:
          return null
      }
    }

    return (
      <Card>
        <Text style={textStyle.header}>{`${distanceInWordsToNow(
          this.props.timestamp
        )} ago`}</Text>
        <View style={blockStyle.column}>
          <View
            style={{ flex: 4, justifyContent: 'space-between', padding: 5 }}
          >
            <BlockButton
              style={{ marginBottom: 5 }}
              title="PREVIOUS HASH"
              hash={previousHash}
            />

            <BlockButton title="BLOCK KEY HASH" hash={blockKeyHash} />
          </View>

          <View
            style={{
              flex: 1,
              borderLeftColor: Colors.headerLine,
              borderLeftWidth: 1,
              marginVertical: 5,
              marginHorizontal: 5,
            }}
          >
            <View style={{ flex: 3 }} />
            <Text style={[{ flex: 1 }, textStyle.nano]}>SHA256</Text>
            <View
              style={{
                flex: 1,
                borderTopColor: Colors.headerLine,
                borderTopWidth: 1,
              }}
            />
          </View>

          <View
            style={{
              flex: 4,
              justifyContent: 'space-between',
              padding: 3,
            }}
          >
            <FontIcon
              name={blockKey ? 'check_out' : 'check_in'}
              size={30}
              color={Colors.headerLine}
              style={{ textAlign: 'center', marginVertical: 5 }}
            />
            <BlockButton title="BLOCK HASH" hash={blockHash} />
          </View>
        </View>

        <BlockInfo />
      </Card>
    )
  }
}

hashBlockContainer = hash => ({
  backgroundColor: `#${hash.slice(0, 6)}`,
  borderColor: Colors.headerLine,
  borderRadius: 7,
  padding: 5,
})

hashBlockText = hash => [
  textStyle.hash,
  {
    color: invert(`#${hash.slice(0, 6)}`, true),
    backgroundColor: `#${hash.slice(0, 6)}`,
  },
]

const blockStyle = StyleSheet.create({
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  blockKey: {
    backgroundColor: Colors.headerLine,
    borderColor: Colors.tintColor,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    padding: 5,
  },
  blockInfo: {
    paddingVertical: 5,
    borderTopColor: Colors.headerLine,
    borderTopWidth: 1,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0.3,
        },
      },
      android: {
        elevation: 1,
        position: 'relative',
      },
    }),
  },
})

const defaultText = {
  fontFamily: 'Aldrich',
  fontSize: 12,
  textAlign: 'center',
}

const textStyle = StyleSheet.create({
  defaultText,
  header: {
    ...defaultText,
    fontSize: 18,
    marginVertical: 10,
  },
  subheader: {
    ...defaultText,
    paddingTop: 5,
    paddingBottom: 2,
    fontSize: 14,
  },
  right: {
    ...defaultText,
    textAlign: 'right',
  },
  nano: {
    ...defaultText,
    color: Colors.headerLine,
    fontSize: 7,
    textAlign: 'center',
  },
  hash: {
    fontFamily: 'NovaMono',
    fontSize: 16,
    textAlign: 'center',
  },
})
