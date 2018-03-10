import React from 'react'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import GrommetApp from 'grommet/components/App'
import Grommet from 'grommet/components/Grommet'
import Header from 'grommet/components/Header'
import Sidebar from 'grommet/components/Sidebar'
import Split from 'grommet/components/Split'
import Title from 'grommet/components/Title'
import MenuIcon from 'grommet/components/icons/base/Menu'

import { withRouter } from 'react-router-dom'

import Routes from '../routes'
import LoginForm from '../login/components/LoginForm'

import './App.scss'

export class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      sidebar: false
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar () {
    this.setState({sidebar: !this.state.sidebar})
  }

  render () {
    if (this.props.location && this.props.location.pathname && this.props.location.pathname.indexOf('login') >= 0) {
      return <GrommetApp>
        <LoginForm />
      </GrommetApp>
    }

    return <Grommet>
      <GrommetApp>
        <Header colorIndex='neutral-2'>
          <Button id='App__menu-toggle' icon={<MenuIcon />} onClick={this.toggleSidebar} />
          <Title pad='small'>
            Sample Title
          </Title>
        </Header>
        <Split flex='right' priority={this.state.sidebar ? 'left' : 'right'}>
          <Sidebar colorIndex='neutral-1' size='small' onClick={this.toggleSidebar}>
            menu
          </Sidebar>
          <Box
            justify='center'
            align='center'
            pad='medium'
          >
            <Routes/>
          </Box>
        </Split>
      </GrommetApp>
    </Grommet>
  }
}

export default withRouter(App)
