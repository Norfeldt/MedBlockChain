//import liraries
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'

import dateFomatter from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import InfoRow from './basic/InfoRow'
import Button from './basic/Button'

import Colors from '../constants/Colors'

// create a component
const Card = ({
  dateTaken,
  manufacture,
  productionDate,
  subADose,
  subAUnits,
  subBDose,
  subBUnits,
  salt,
  checked_out,
  onCancelPress,
  onCheckInPress,
}) => {
  const SerializeOptions = () => {
    return (
      <View>
        <TouchableOpacity onPress={onCancelPress}>
          <Text style={styles.textCancel}>CANCEL</Text>
        </TouchableOpacity>

        <Button
          title="CHECK OUT"
          iconName="check_out"
          onPress={onCheckInPress}
        />
      </View>
    )
  }

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: checked_out ? '#fff' : '#E0EBF1' },
      ]}
    >
      {dateTaken && (
        <Text style={styles.textHeader}>
          {`${distanceInWordsToNow(dateTaken)} ago`}
        </Text>
      )}
      <InfoRow setting="Manufacture" value={manufacture} />
      <InfoRow
        setting="Production Date"
        value={`${dateFomatter(productionDate, 'YYYY-MM-DD')}`}
      />
      <InfoRow
        setting="Substance A Dose"
        value={`${subADose.toFixed(2)} ${subAUnits}`}
      />
      <InfoRow
        setting="Substance B Dose"
        value={`${subBDose.toFixed(2)} ${subBUnits}`}
      />
      <InfoRow setting="Hash Salt" value={salt} />

      {!checked_out && <SerializeOptions />}
    </View>
  )
}

// define your styles
const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.headerLine,
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
  textHeader: {
    color: Colors.headerTextColor,
    textAlign: 'center',
    fontFamily: 'Aldrich',
    fontSize: 20,
    paddingTop: 7,
  },
  textCancel: {
    flex: 1,
    color: Colors.idleColor,
    textAlign: 'center',
    fontFamily: 'Aldrich',
    paddingVertical: 20,
  },
})

//make this component available to the app
export default Card
