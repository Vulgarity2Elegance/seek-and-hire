import React from 'react'
import { NavBar } from 'antd-mobile'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import TabLinkBar from './NavLink/TabLinkBar'
import Hirer from './Hirer'
import Seeker from './Seeker'
import AboutMe from './AboutMe'

function msg() {
  return null
}

function share() {
  return null
}

class Dashboard extends React.Component {
  render() {
    const {pathname} = this.props.location
    const type = this.props.type
    const navList = [
      {
        path: '/msg',
        icon: 'msg',
        title: 'Hire me',
        component: msg,
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
      {
        path: '/share',
        icon: 'share',
        title: 'Share',
        component: share,
      },
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

const mapStatetoProps = (state) => state.user
Dashboard = connect(mapStatetoProps) (Dashboard)

export default Dashboard