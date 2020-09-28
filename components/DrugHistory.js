//import liraries
import map from 'lodash/map'
import React from 'react'
import { View } from 'react-native'
import { ContextConsumer } from '../Context'
import Card from './basic/Card'
import Text from './basic/Text'
import ListData from './ListData'
import HashBlock from './basic/HashBlock'
import { getHashOfproductData } from '../cloudComputing/Block'
import Colors from '../constants/Colors'
import Warning from './BlockCardFractions/Warning'

// create a component
export default function DrugHistory(props) {
    return (
      <ContextConsumer>
        {({ patientDrugHistory, blockchain: { falsifiedMedicine } }) => {
          return (
            <View style={{ flex: 1 }}>
              {map(patientDrugHistory, ({ dateTaken, productData }, index) => {
                const hash = getHashOfproductData(productData)
                const multipleCheckOUT = falsifiedMedicine.multipleCheckOUT.has(
                  hash
                )
                const neverCheckedIN = falsifiedMedicine.neverCheckedIN.has(
                  hash
                )
                return (
                  <View key={index}>
                    <Card
                      style={{
                        backgroundColor:
                          multipleCheckOUT || neverCheckedIN
                            ? Colors.warningBackground
                            : Colors.scrollBG,
                      }}
                    >
                      <Warning
                        style={{ paddingTop: 10 }}
                        multipleCheckOUT={multipleCheckOUT}
                        neverCheckedIN={neverCheckedIN}
                      />

                      <ListData data={productData} />
                      <HashBlock value={hash} />
                    </Card>
                  </View>
                )
              })}
            </View>
          )
        }}
      </ContextConsumer>
    )
}
