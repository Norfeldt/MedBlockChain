//import liraries
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import subDays from 'date-fns/sub_days'

import Card from '../components/Card'

// create a component
const MedicationHistory = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Card
        dateTaken={subDays(new Date(), 1)}
        manufacture={'Jukka Labs'}
        productionDate={subDays(new Date(), 15)}
        subADose={3}
        subAUnits={'mg'}
        subBDose={90}
        subBUnits={'mg'}
        salt={'DHW29'}
        checked_out={true}
      />

      <Card
        dateTaken={subDays(new Date(), 4)}
        manufacture={'Jukka Labs'}
        productionDate={subDays(new Date(), 20)}
        subADose={4}
        subAUnits={'mg'}
        subBDose={80}
        subBUnits={'mg'}
        salt={'U1W2D'}
        checked_out={true}
      />

      <Card
        dateTaken={subDays(new Date(), 7)}
        manufacture={'Jukka Labs'}
        productionDate={subDays(new Date(), 25)}
        subADose={7}
        subAUnits={'mg'}
        subBDose={50}
        subBUnits={'mg'}
        salt={'IWH32'}
        checked_out={true}
      />

      <Card
        dateTaken={subDays(new Date(), 9)}
        manufacture={'Jukka Labs'}
        productionDate={subDays(new Date(), 26)}
        subADose={5}
        subAUnits={'mg'}
        subBDose={75}
        subBUnits={'mg'}
        salt={'86GAA'}
        checked_out={true}
      />
    </ScrollView>
  )
}

//make this component available to the app
export default MedicationHistory
