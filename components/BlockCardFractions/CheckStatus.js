import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import FontIcon from '../basic/FontIcon'
import Text from '../basic/Text'
import { getHashColors } from '../../constants/Colors'

export default function componentName(props) {
    const { productData, productDataHash } = props
    const iconSize = 60
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text
          type="p"
          style={[
            blockStyle.shadow,
            {
              color: getHashColors(productDataHash).backgroundColor,
            },
          ]}
        >
          CHECK {productData ? 'OUT' : 'IN'}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {!productData && (
            <FontIcon
              name="drug"
              size={iconSize}
              color={getHashColors(productDataHash).backgroundColor}
              style={[{ textAlign: 'center' }, blockStyle.shadow]}
            />
          )}
          <FontIcon
            name={productData ? 'check_out' : 'check_in'}
            size={iconSize}
            color={getHashColors(productDataHash).backgroundColor}
            style={[{ textAlign: 'center' }, blockStyle.shadow]}
          />
          {productData && (
            <FontIcon
              name="drug"
              size={iconSize}
              color={getHashColors(productDataHash).backgroundColor}
              style={[{ textAlign: 'center' }, blockStyle.shadow]}
            />
          )}
        </View>
      </View>
    )
}

const blockStyle = StyleSheet.create({
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
