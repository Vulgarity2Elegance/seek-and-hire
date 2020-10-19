import React from 'react'
import {connect} from 'react-redux'
import {addNum, removeNum, addNumAsync} from './index.redux'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Number: {this.props.num} </h1>
        <button onClick={this.props.addNum}>Add Number</button>
        <button onClick={this.props.removeNum}>Remove Number</button>
        <button onClick={this.props.addNumAsync}>Add Number Async</button>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {num:state}
}
const actionCreators = {addNum, removeNum, addNumAsync}

App = connect(mapStatetoProps, actionCreators) (App)
export default App