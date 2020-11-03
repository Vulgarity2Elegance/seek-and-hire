import React from 'react'
import { connect } from 'react-redux'
import { Button, List, Modal, Result, WhiteSpace, WingBlank } from 'antd-mobile'
import ListItem, { Brief } from 'antd-mobile/lib/list/ListItem'
import cookies from 'browser-cookies'
import { logoutSubmit } from '../redux/user.redux'
import { Redirect } from 'react-router-dom'

class AboutMe extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert
    alert('Logout', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
      { text: 'OK', onPress: () => {
        cookies.erase('userId')
        this.props.logoutSubmit()
      }},
    ]);
  }
  render() {
    const props = this.props
    return props.username ? (
    <div>
      <Result
      style={{backgroundColor: 'bisque'}}
      img={ <img src={require(`./AvatarSelector/img/${props.avatar}.png`)} alt='avatar'/> }
      title={props.username}
      /> 
      <WhiteSpace size='xl' />
      <List renderHeader={() => 'Title'}>
        <ListItem multipleLine> {props.title} </ListItem>
      </List>
      <List renderHeader={() => 'Company'}>
        <ListItem multipleLine> {props.company} </ListItem>
      </List>
      <List renderHeader={() => 'Salary'}>
        <ListItem multipleLine> {props.salary} </ListItem>
      </List>
      <List renderHeader={() => 'Description'}>
        <ListItem>
          {props.bio.split('\n').map(v => <Brief key={v}> {v} </Brief>)}
        </ListItem>
      </List>
      <WhiteSpace size='xl'/>
      <WingBlank>
        <Button type='warning' size='large' onClick={this.logout}>Logout</Button>
      </WingBlank>
    </div>) : <Redirect to={props.redirectTo} />
  }
}

const mapStatetoProps = (state) => state.user
const actionCreators = {logoutSubmit}
AboutMe = connect(mapStatetoProps, actionCreators) (AboutMe)

export default AboutMe