import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import DiagnosticScreen from '../screens/DiagnosticScreen'
import ManufactureScreen from '../screens/ManufactureScreen'
import PatientScreen from '../screens/PatientScreen'
import SerializationScreen from '../screens/SerializationScreen'

const DiagnosticStack = createStackNavigator({
  diagnostic: DiagnosticScreen,
})

DiagnosticStack.navigationOptions = {
  tabBarLabel: 'Diagnostic',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="diagnostic" />
  ),
}

const ManufactureStack = createStackNavigator({
  manufacture: ManufactureScreen,
})

ManufactureStack.navigationOptions = {
  tabBarLabel: 'Manufacture',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="manufacture" />
  ),
}

const PatientStack = createStackNavigator({
  Patient: PatientScreen,
})

PatientStack.navigationOptions = {
  tabBarLabel: 'Patient',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="patient" />,
}

const SerializationStack = createStackNavigator({
  Serialization: SerializationScreen,
})

SerializationStack.navigationOptions = {
  tabBarLabel: 'Serialization',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="block_chain" />
  ),
}

export default createBottomTabNavigator({
  ManufactureStack,
  PatientStack,
  SerializationStack,
  DiagnosticStack,
})
