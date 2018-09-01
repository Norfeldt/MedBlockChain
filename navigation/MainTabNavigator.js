import React from 'react'
import { Platform, Text } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/basic/TabBarIcon'
import MonitoringScreen from '../screens/MonitoringScreen'
import ManufactureScreen from '../screens/ManufactureScreen'
import PatientScreen from '../screens/PatientScreen'
import BlockchainScreen from '../screens/BlockchainScreen'

import Colors from '../constants/Colors'

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
    <TabBarIcon focused={focused} name="manufacture" />
  ),
}

const PatientStack = createStackNavigator({
  Patient: PatientScreen,
})

PatientStack.navigationOptions = {
  tabBarLabel: 'PATIENT',
  tabBarOptions,
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="patient" />,
}

const BlockchainStack = createStackNavigator({
  Blockchain: BlockchainScreen,
})

BlockchainStack.navigationOptions = {
  tabBarLabel: 'BLOCKCHAIN',
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="block_chain" />
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
