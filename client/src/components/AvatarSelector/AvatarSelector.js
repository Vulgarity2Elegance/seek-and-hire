import React from 'react'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const avatarList = 'api,cmd,css3,github,html5,java,js,mac,php,python,react,windows'
      .split(',')
      .map(v => ({
        icon: require(`./img/${v}.png`),
        text: v
      }))
    const gridHeader = this.state.icon 
      ? (<div> 
          <span>Selected Avatar:</span> 
          <img 
            style={{width: 26.25, height: 26.25, margin: '9px 0px 0px', paddingLeft: '10px'}} 
            src={this.state.icon} 
            alt='avatar'
          />
        </div>)
      : <div>Select your avatar...</div>
    return(
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid 
            data={avatarList} 
            onClick={ele => {
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector