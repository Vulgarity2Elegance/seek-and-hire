import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    return (
      <WingBlank>
        {this.props.userList.map(v => ( 
          v.avatar 
          ? (
          <div key={v._id}>
            <WhiteSpace />
            <Card>
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
                content={v.type === 'hirer' ? <div> {v.company} </div> : null}
                extra={v.type === 'hirer' ? <div> {v.salary} </div> : null}
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

export default UserCard