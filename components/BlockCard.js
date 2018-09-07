import React, { PureComponent } from 'react'
import { LayoutAnimation, View, Text } from 'react-native'
import Card from './basic/Card'
import BlockButton from './BlockCardFractions/BlockButton'
import BlockConnector from './BlockCardFractions/BlockConnector'
import ChainingInfo from './BlockCardFractions/ChainingInfo'
import CheckINInfo from './BlockCardFractions/CheckINInfo'
import CheckOUTInfo from './BlockCardFractions/CheckOUTInfo'
import CheckStatus from './BlockCardFractions/CheckStatus'
import MiddlePart from './BlockCardFractions/MiddlePart'
import TimestampInfo from './BlockCardFractions/TimestampInfo'
import Colors from '../constants/Colors'
import Warning from './BlockCardFractions/Warning'

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
      productDataHash,
      previousBlockHash,
      productData,
      drugMetaData,
      hashAlgorithmName,
      multipleCheckOUT,
      neverCheckedIN,
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
              productDataHash={this.props.previousBlockInfo.productDataHash}
              hash={this.props.previousBlockHash}
              hashAlgorithmName={this.props.hashAlgorithmName}
            />
          )

        case 'PRODUCT DATA':
          if (productData) {
            return (
              <CheckOUTInfo
                productData={productData}
                productDataHash={productDataHash}
                hashAlgorithmName={hashAlgorithmName}
              />
            )
          } else {
            return (
              <CheckINInfo
                drugMetaData={drugMetaData}
                productDataHash={productDataHash}
              />
            )
          }

        case 'BLOCK HASH':
          return (
            <ChainingInfo
              timestamp={this.props.timestamp}
              previousBlockHash={this.props.previousBlockHash}
              productDataHash={this.props.productDataHash}
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
    const falsified = multipleCheckOUT || neverCheckedIN
    return (
      <View>
        <Card
          style={{
            padding: 5,
            marginBottom: 0,
            backgroundColor: falsified ? Colors.warningBackground : 'white',
          }}
        >
          <Warning
            multipleCheckOUT={multipleCheckOUT}
            neverCheckedIN={neverCheckedIN}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 4, justifyContent: 'space-between' }}>
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
                title="PRODUCT DATA"
                value={productDataHash}
              />

              <BlockButton
                onPress={this.onButtonPress}
                style={{ marginBottom: 5 }}
                title="PREVIOUS HASH"
                value={previousBlockHash}
              />
            </View>

            <MiddlePart hashAlgorithmName={hashAlgorithmName} />

            <View
              style={{
                flex: 4,
                justifyContent: 'space-between',
              }}
            >
              <BlockButton
                onPress={this.onButtonPress}
                title="BLOCK HASH"
                value={blockHash}
              />

              <CheckStatus
                productData={productData}
                productDataHash={productDataHash}
              />
            </View>
          </View>

          <BlockInfo />
        </Card>

        <BlockConnector />
      </View>
    )
  }
}
