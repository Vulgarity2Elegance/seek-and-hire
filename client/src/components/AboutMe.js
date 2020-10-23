import React from 'react'
import { connect } from 'react-redux'
import { Button, List, Result, WhiteSpace } from 'antd-mobile'
import ListItem, { Brief } from 'antd-mobile/lib/list/ListItem'

class AboutMe extends React.Component {
  render() {
    return(
      this.props.username
      ? 
        <div>
          <Result
            img={ <img src={require(`./AvatarSelector/img/${this.props.avatar}.png`)} alt='avatar'/> }
            title={this.props.username}
          />
          <WhiteSpace size='xl' />
          <List renderHeader={() => 'Title'}>
            <ListItem multipleLine> {this.props.title} </ListItem>
          </List>
          <List renderHeader={() => 'Company'}>
            <ListItem multipleLine> {this.props.company} </ListItem>
          </List>
          <List renderHeader={() => 'Salary'}>
            <ListItem multipleLine> {this.props.salary} </ListItem>
          </List>
          <List renderHeader={() => 'Description'}>
            <ListItem>
              {this.props.bio.split('\n').map(v => <Brief key={v}> {v} </Brief>)}
            </ListItem>
          </List>
          <WhiteSpace size='xl'/>
          <Button 
            type='warning'
            onClick={() => {
              console.log('mom')
            }}
          >
            Logout
          </Button>
        </div>
      : 
        null
    )
  }
}

const mapStatetoProps = (state) => state.user
const actionCreators = {}
AboutMe = connect(mapStatetoProps, actionCreators) (AboutMe)

export default AboutMe