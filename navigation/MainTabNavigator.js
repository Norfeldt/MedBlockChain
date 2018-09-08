import React from 'react'
import { Platform } from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import TabBarIcon from '../components/basic/TabBarIcon'
import Colors from '../constants/Colors'
import BlockchainScreen from '../screens/BlockchainScreen'
import ManufactureScreen from '../screens/ManufactureScreen'
import MonitoringScreen from '../screens/MonitoringScreen'
import PatientScreen from '../screens/PatientScreen'
import { ContextConsumer } from '../Context'

const tabBarOptions = {
  activeTintColor: Colors.themeColor,
  labelStyle: {
    fontFamily: 'Aldrich',
    fontSize: 10,
  },
  style: {
    backgroundColor: Colors.panel,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {
          height: -1,
        },
        paddingTop: 1,
      },
      android: {
        elevation: 1,
        position: 'relative',
      },
    }),
  },
}

const ManufactureStack = createStackNavigator({
  manufacture: ManufactureScreen,
})

ManufactureStack.navigationOptions = {
  tabBarLabel: 'MANUFACTURE',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <ContextConsumer>
      {({ manufacturedDrugs }) => {
        return (
          <TabBarIcon
            focused={focused}
            name="manufacture"
            counter={manufacturedDrugs.length}
          />
        )
      }}
    </ContextConsumer>
  ),
}

const PatientStack = createStackNavigator({
  Patient: PatientScreen,
})

PatientStack.navigationOptions = {
  tabBarLabel: 'PATIENT',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <ContextConsumer>
      {({ genuineDrugs }) => {
        return (
          <TabBarIcon
            focused={focused}
            name="patient"
            counter={genuineDrugs.length}
          />
        )
      }}
    </ContextConsumer>
  ),
}

const BlockchainStack = createStackNavigator({
  Blockchain: BlockchainScreen,
})

BlockchainStack.navigationOptions = {
  tabBarLabel: 'BLOCKCHAIN',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <ContextConsumer>
      {({ blockchain }) => {
        return (
          <TabBarIcon
            focused={focused}
            name="block_chain"
            counter={blockchain.chain.length}
          />
        )
      }}
    </ContextConsumer>
  ),
}

const MonitoringStack = createStackNavigator({
  monitoring: MonitoringScreen,
})

MonitoringStack.navigationOptions = {
  tabBarLabel: 'Monitoring',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="monitoring" />
  ),
}

export default createBottomTabNavigator({
  ManufactureStack,
  PatientStack,
  MonitoringStack,
  BlockchainStack,
})
