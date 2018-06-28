import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Header from '../components/Header'
import FontIcon from '../components/FontIcon'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: <Header title="Manufacture" />,
  }

  render() {
    return (
      <View style={styles.container}>
        <FontIcon name="manufacture" size={350} />
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
