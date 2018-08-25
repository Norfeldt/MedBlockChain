import React, { PureComponent } from 'react'
import { LayoutAnimation, Platform, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import Card from './basic/Card'
import FontIcon from './basic/FontIcon'
import BlockButton from './BlockCardFractions/BlockButton'
import BlockConnector from './BlockCardFractions/BlockConnector'
import ChainingInfo from './BlockCardFractions/ChainingInfo'
import CheckINInfo from './BlockCardFractions/CheckINInfo'
import CheckOUTInfo from './BlockCardFractions/CheckOUTInfo'
import TimestampInfo from './BlockCardFractions/TimestampInfo'

export default class BlockCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBlockInfo: null,
    }
  }

  onButtonPress = buttonTitle => {
    this.setState({
      showBlockInfo:
        this.state.showBlockInfo == buttonTitle ? null : buttonTitle,
    })
  }

  render() {
    const {
      blockHash,
      timestamp,
      drugDataHash,
      previousBlockHash,
      drugData,
      drugMetaData,
      hashAlgorithmName,
    } = this.props

    BlockInfo = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

      const { showBlockInfo } = this.state
      switch (showBlockInfo) {
        case 'PREVIOUS HASH':
          return (
            <ChainingInfo
              timestamp={this.props.previousBlockInfo.timestamp}
              previousBlockHash={this.props.previousBlockInfo.previousBlockHash}
              drugDataHash={this.props.previousBlockInfo.drugDataHash}
              hash={this.props.previousBlockHash}
              hashAlgorithmName={this.props.hashAlgorithmName}
            />
          )

        case 'DRUG DATA':
          if (drugData) {
            return (
              <CheckOUTInfo
                drugData={drugData}
                drugDataHash={drugDataHash}
                hashAlgorithmName={hashAlgorithmName}
              />
            )
          } else {
            return (
              <CheckINInfo
                drugMetaData={drugMetaData}
                drugDataHash={drugDataHash}
              />
            )
          }

        case 'BLOCK HASH':
          return (
            <ChainingInfo
              timestamp={this.props.timestamp}
              previousBlockHash={this.props.previousBlockHash}
              drugDataHash={this.props.drugDataHash}
              hash={this.props.blockHash}
              hashAlgorithmName={this.props.hashAlgorithmName}
            />
          )

        case 'TIMESTAMP':
          return <TimestampInfo timestamp={timestamp} />

        default:
          return null
      }
    }

    return (
      <View>
        <Card style={{ marginBottom: 0 }}>
          <View style={blockStyle.column}>
            <View
              style={{ flex: 4, justifyContent: 'space-between', padding: 5 }}
            >
              <BlockButton
                onPress={this.onButtonPress}
                style={{ marginBottom: 5 }}
                title="TIMESTAMP"
                value={timestamp}
                valueIsHash={false}
              />

              <BlockButton
                onPress={this.onButtonPress}
                style={{ marginBottom: 5 }}
                title="DRUG DATA"
                value={drugDataHash}
              />

              <BlockButton
                onPress={this.onButtonPress}
                title="PREVIOUS HASH"
                value={previousBlockHash}
              />
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
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text style={textStyle.nano}>{hashAlgorithmName}</Text>
              </View>
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
              <BlockButton
                onPress={this.onButtonPress}
                title="BLOCK HASH"
                value={blockHash}
              />

              <View style={{ justifyContent: 'center', flex: 1 }}>
                <FontIcon
                  name={drugData ? 'check_out' : 'check_in'}
                  size={70}
                  color={`#${this.props.drugDataHash.slice(0, 6)}`}
                  style={[{ textAlign: 'center' }, blockStyle.shadow]}
                />
              </View>
            </View>
          </View>

          <BlockInfo />
        </Card>
        <BlockConnector />
      </View>
    )
  }
}

const blockStyle = StyleSheet.create({
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  drugData: {
    backgroundColor: Colors.passiveBG,
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
    fontSize: 14,
    textAlign: 'center',
  },
})
