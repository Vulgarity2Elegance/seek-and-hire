import React from 'react'
import { NavBar } from 'antd-mobile'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import TabLinkBar from './NavLink/TabLinkBar'
import Hirer from './Hirer'
import Seeker from './Seeker'
import AboutMe from './AboutMe'
import Message from './Message'
import { getMsgList, receiveMsg, readMsg} from '../redux/message.redux'
// import Explore from './Explore'

class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.message.chatMsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
      const to = this.props.match.params.user
      this.props.readMsg(to)
    }
  }
  render() {
    const {pathname} = this.props.location
    const type = this.props.user.type
    const navList = [
      {
        path: '/msg',
        icon: 'msg',
        title: 'Hire me',
        component: Message
      },
      {
        path: '/seeker',
        icon: 'job',
        title: 'Hirer List',
        component: Seeker,
        hide: type === 'hirer'
      },
      {
        path: '/hirer',
        icon: 'job',
        title: 'Seeker List',
        component: Hirer,
        hide: type === 'seeker'
      },
      // {
      //   path: '/share',
      //   icon: 'share',
      //   title: 'Explore',
      //   component: Explore,
      // },
      {
        path: '/me',
        icon: 'user',
        title: 'About Me',
        component: AboutMe,
      }
    ]
    return(
      <div>
        <NavBar className='fixed-header' mode='dark'>
          {navList.find(v => v.path === pathname) ? navList.find(v => v.path === pathname).title : null}
        </NavBar>
        <Switch>
          {navList.map(v => (
            <Route 
              key={v.path}
              path={v.path}
              component={v.component}
            />
          ))}
        </Switch>
        <TabLinkBar data={navList} />
      </div>
    )
  }
}

const mapStatetoProps = (state) => state
const actionCreators = {getMsgList, receiveMsg, readMsg}
Dashboard = connect(mapStatetoProps, actionCreators) (Dashboard)

export default Dashboard