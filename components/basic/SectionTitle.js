import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

export default function SectionTitle(props) {
    const Line = () => (
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <View
          style={{
            flex: 1,
            borderColor: Colors.themeColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={{ flex: 1, paddingBottom: 2 }} />
      </View>
    )
    return (
      <View style={[blockStyle.section, props.style]}>
        <Line />
        <Text style={textStyle.sectionTitle}>{props.name}</Text>
        <Line />
      </View>
    )
}

const blockStyle = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
})

const textStyle = StyleSheet.create({
  sectionTitle: {
    fontFamily: 'Aldrich_400Regular',
    fontSize: 24,
    textAlign: 'center',
    color: Colors.themeColor,
  },
})
