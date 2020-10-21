import React from 'react'
import { Button, InputItem, NavBar, TextareaItem, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../components/AvatarSelector/AvatarSelector'

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
    return(
      <div>
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

export default HirerInfo