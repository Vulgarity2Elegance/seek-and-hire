import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class TabLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const {pathname} = this.props.location
    return (
      <TabBar>
        {navList.map(v => 
          (<TabBar.Item
            badge={v.path === '/msg' ? this.props.unread : ''}
            key={v.path}
            title={v.title}
            icon={{uri: require(`./img/${v.icon}.png`)}}
            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
            selected={pathname === v.path}
            onPress={() => this.props.history.push(v.path)}
          />)
        )}
      </TabBar>
    )
  }
}

const mapStatetoProps = (state) => state.message
TabLinkBar = connect(mapStatetoProps) (TabLinkBar)

export default withRouter(TabLinkBar)