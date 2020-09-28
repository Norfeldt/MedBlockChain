import React from 'react'
import { View, LayoutAnimation, Platform } from 'react-native'
import Colors from '../constants/Colors'
import FontIcon from './basic/FontIcon'
import Text from './basic/Text'
import { ContextConsumer } from '../Context'

export default function DosePrescription(props) {
    const { style } = props

    return (
      <ContextConsumer>
        {({ getDoseRange, prescriptionDose }) => {
          const { minDose, maxDose } = getDoseRange()
          const [leftFlex, middleFlex, rightFlex] = prescriptionDose

          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
          return (
            <View
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                style,
              ]}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontIcon
                  name="machine_learning"
                  size={40}
                  style={{
                    ...Platform.select({
                      ios: {
                        paddingBottom: 0,
                      },
                      android: {
                        paddingBottom: 10,
                      },
                    }),
                  }}
                />
                <Text type="p" style={{ marginTop: 5 }}>
                  Recommended Prescription
                </Text>
              </View>

              {/* MIN DOSE + BAR + MAX DOSE */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}
              >
                {/* MIN DOSE */}
                <Text style={{ flex: 7, fontSize: 12 }}>
                  {minDose.toFixed(0)}
                </Text>

                {/* BAR */}
                <View
                  style={{
                    flex: 70,
                    flexDirection: 'row',
                    backgroundColor: Colors.scrollBG,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: Colors.passive,
                    paddingVertical: 2,
                  }}
                >
                  <View
                    style={{
                      flex: leftFlex,
                    }}
                  />
                  <View
                    style={{
                      flex: middleFlex,
                      backgroundColor: Colors.themeColor,
                      borderRadius: 3,
                    }}
                  />
                  <View
                    style={{
                      flex: rightFlex,
                    }}
                  />
                </View>

                {/* MAX DOSE */}
                <Text style={{ flex: 7, fontSize: 12 }}>
                  {maxDose.toFixed(0)}
                </Text>
              </View>
            </View>
          )
        }}
      </ContextConsumer>
    )
}
