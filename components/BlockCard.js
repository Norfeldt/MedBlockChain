import React, { PureComponent } from 'react'
import { LayoutAnimation, View } from 'react-native'
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
import Text from '../components/basic/Text'
import FontIcon from './basic/FontIcon'

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
      index,
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
            backgroundColor: falsified
              ? Colors.warningBackground
              : Colors.scrollBG,
            borderWidth: 2,
            borderColor: Colors.themeColor,
          }}
        >
          <Warning
            multipleCheckOUT={multipleCheckOUT}
            neverCheckedIN={neverCheckedIN}
          />

          {index == 0 && <Text type="h3">GENESIS BLOCK</Text>}
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
                colorize={index != 0}
              />

              <BlockButton
                onPress={this.onButtonPress}
                style={{ marginBottom: 5 }}
                title="PREVIOUS HASH"
                value={previousBlockHash}
                colorize={false}
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
                colorize={false}
              />

              {index !== 0 && (
                <CheckStatus
                  productData={productData}
                  productDataHash={productDataHash}
                />
              )}

              {index == 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FontIcon name="aid" size={70} color={Colors.themeColor} />
                </View>
              )}
            </View>
          </View>

          <BlockInfo />
        </Card>

        {index !== 0 && (
          <BlockConnector lineWidth={2} lineColor={Colors.themeColor} />
        )}
      </View>
    )
  }
}
