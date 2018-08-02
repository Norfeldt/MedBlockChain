import React from 'react'
import { StyleSheet, View } from 'react-native'

import Header from '../components/basic/Header'
import BlockCard from '../components/BlockCard'

export default class BlockchainScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  render() {
    return (
      <View style={styles.container}>
        <BlockCard />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
