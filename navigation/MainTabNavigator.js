import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

const DiagnosticStack = createStackNavigator({
  diagnostic: HomeScreen,
})

DiagnosticStack.navigationOptions = {
  tabBarLabel: 'Diagnostic',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="diagnostic" />
  ),
}

const ManufactureStack = createStackNavigator({
  manufacture: LinksScreen,
})

ManufactureStack.navigationOptions = {
  tabBarLabel: 'Manufacture',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="manufacture" />
  ),
}

const PatientStack = createStackNavigator({
  Patient: SettingsScreen,
})

PatientStack.navigationOptions = {
  tabBarLabel: 'Patient',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="patient" />,
}

const SerializationStack = createStackNavigator({
  Serialization: HomeScreen,
})

SerializationStack.navigationOptions = {
  tabBarLabel: 'Serialization',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="block_chain" />
  ),
}

export default createBottomTabNavigator({
  DiagnosticStack,
  ManufactureStack,
  PatientStack,
  SerializationStack,
})
