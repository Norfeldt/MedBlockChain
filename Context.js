import React, { Component } from 'react'

import Blockchain from './cloudComputing/Blockchain'

// Using the Context API used in react 16.3 - https://www.youtube.com/watch?v=XLJN4JfniH4
const { Provider, Consumer: ContextConsumer } = React.createContext()

export class ContextProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blockchain: new Blockchain(),
    }
  }

  render() {
    return (
      <Provider value={{ blockchain: this.state.blockchain }}>
        {this.props.children}
      </Provider>
    )
  }
}

module.exports = { ContextConsumer, ContextProvider }
