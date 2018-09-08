import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Text from '../basic/Text'
import FontIcon from '../basic/FontIcon'
import Colors from '../../constants/Colors'

export default class Warning extends PureComponent {
  renderWarning = warningText => (
    <View
      style={[
        { flex: 1, justifyContent: 'center', paddingBottom: 10 },
        this.props.style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <FontIcon
          name="warning"
          size={30}
          style={{ textAlign: 'center', color: Colors.warning }}
        />
        <Text type="h3" style={{ color: Colors.warning }}>
          {' '}
          Warning!{' '}
        </Text>
        <FontIcon
          name="warning"
          size={30}
          style={{ textAlign: 'center', color: Colors.warning }}
        />
      </View>
      <Text style={{ color: Colors.warning }}>{warningText}</Text>
      <Text style={{ fontSize: 10, color: Colors.warning }}>
        Indicate Falsified Medicine
      </Text>
    </View>
  )

  render() {
    if (this.props.multipleCheckOUT) {
      return this.renderWarning('MULTIPLE CHECK OUT')
    }
    if (this.props.neverCheckedIN) {
      return this.renderWarning('NOT CHECKED IN BY\nAUTHORIZED MANUFACTURE ')
    }

    return null
  }
}
