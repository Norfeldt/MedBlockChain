//import liraries
import map from 'lodash/map'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { ContextConsumer } from '../Context'
import Card from './basic/Card'
import Text from './basic/Text'
import ListData from './ListData'
import distanceInWords from 'date-fns/distance_in_words'
import HashBlock from './basic/HashBlock'
import { getHashOfDrugData } from '../cloudComputing/Block'

// create a component
export default class DrugHistory extends PureComponent {
  render() {
    return (
      <ContextConsumer>
        {({ patientDrugHistory }) => {
          return (
            <View style={{ flex: 1 }}>
              {map(patientDrugHistory, ({ dateTaken, drugData }, index) => {
                return (
                  <Card key={index}>
                    <Text type="h3">
                      {distanceInWords(dateTaken, new Date())} ago
                    </Text>
                    <ListData data={drugData} />
                    <HashBlock value={getHashOfDrugData(drugData)} />
                  </Card>
                )
              })}
            </View>
          )
        }}
      </ContextConsumer>
    )
  }
}
