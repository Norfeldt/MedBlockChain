//import liraries
import map from 'lodash/map'
import React, { PureComponent } from 'react'
import { ScrollView } from 'react-native'
import { ContextConsumer } from '../Context'
import Card from './basic/Card'
import Text from './basic/Text'
import ListData from './ListData'
import distanceInWords from 'date-fns/distance_in_words'

// create a component
export default class DrugHistory extends PureComponent {
  render() {
    return (
      <ContextConsumer>
        {({ patientDrugHistory }) => {
          return (
            <ScrollView style={{ flex: 1 }}>
              {map(patientDrugHistory, ({ dateTaken, drugData }, index) => {
                return (
                  <Card key={index}>
                    <Text type="h3">
                      {distanceInWords(dateTaken, new Date())} ago
                    </Text>
                    <ListData data={drugData} />
                  </Card>
                )
              })}
            </ScrollView>
          )
        }}
      </ContextConsumer>
    )
  }
}
