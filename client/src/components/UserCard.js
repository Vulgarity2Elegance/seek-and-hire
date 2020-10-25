import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  clickHandler(v) {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        {this.props.userList.map(v => ( 
          v.avatar 
          ? (
          <div key={v._id}>
            <WhiteSpace />
            <Card
              onClick={ () => this.clickHandler(v)}
            >
              <Card.Header 
                title={v.username}
                thumb={require(`./AvatarSelector/img/${v.avatar}.png`)}
                extra={<span> {v.title} </span>}
              />
              <Card.Body>
                {v.bio.split('\n').map(d => (
                  <div key={d}> {d} </div>
                ))}
                
              </Card.Body>
              <Card.Footer 
                content={<div> {v.company} </div>}
                extra={<div> {v.salary} </div>}
              />
            </Card>
          </div>
          )
          : null
        ))}
      </WingBlank>
    )
  }
}

export default withRouter(UserCard)