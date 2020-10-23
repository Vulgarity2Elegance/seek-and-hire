import React from 'react'
import { NavBar } from 'antd-mobile'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import TabLinkBar from './NavLink/TabLinkBar'
import Hirer from './Hirer'
import Seeker from './Seeker'
import AboutMe from './AboutMe'

function msg() {
  return <h2>msg</h2>
}

function share() {
  return <h2>Share</h2>
}

class Dashboard extends React.Component {
  render() {
    const {pathname} = this.props.location
    const type = this.props.type
    const navList = [
      {
        path: '/msg',
        text: 'msg',
        icon: 'msg',
        title: 'Hire me',
        component: msg,
      },
      {
        path: '/seeker',
        text: 'Hirer',
        icon: 'job',
        title: 'Hirer List',
        component: Seeker,
        hide: type === 'hirer'
      },
      {
        path: '/hirer',
        text: 'seeker',
        icon: 'job',
        title: 'Seeker List',
        component: Hirer,
        hide: type === 'seeker'
      },
      {
        path: '/share',
        icon: 'share',
        title: 'Share',
        component: share,
      },
      {
        path: '/me',
        text: 'me',
        icon: 'user',
        title: 'About Me',
        component: AboutMe,
      }
    ]
    return(
      <div>
        <NavBar className='fixed-header' mode='dark'>
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div>
          <Switch>
            {navList.map(v => (
              <Route 
                key={v.path}
                path={v.path}
                component={v.component}
              />
            ))}
          </Switch>
        </div>
        <TabLinkBar data={navList} />
      </div>
    )
  }
}

const mapStatetoProps = (state) => state.user
Dashboard = connect(mapStatetoProps) (Dashboard)

export default Dashboard