import React from 'react'
import { Button, InputItem, NavBar, TextareaItem, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../components/AvatarSelector/AvatarSelector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../redux/user.redux'

class HirerInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      salary: '',
      bio: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return(
      <div>
        {redirect && redirect !== path 
          ? <Redirect to={this.props.redirectTo}/> 
          : null}
        <NavBar mode='dark'>HirerInfo Dashboard</NavBar>
        <AvatarSelector selectAvatar={(imgName) => {
          this.setState({
            avatar: imgName
          })
        }}/>
        <WhiteSpace />
        <InputItem onChange={(v) => this.onChange('title', v)}>Title</InputItem>
        <InputItem onChange={(v) => this.onChange('company', v)}>Company</InputItem>
        <InputItem onChange={(v) => this.onChange('salary', v)}>Salary</InputItem>
        <TextareaItem onChange={(v) => this.onChange('bio', v)} rows={3} autoHeight title='Bio' />
        <WhiteSpace />
        <Button 
          onClick={() => {
            this.props.update(this.state)
          }}
          type='primary'>Save</Button>
      </div>
    )
  }
}

const mapStatetoProps = (state) => state.user
const actionCreators = {update}
HirerInfo = connect(mapStatetoProps, actionCreators) (HirerInfo)

export default HirerInfo