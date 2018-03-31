import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import GrommetApp from 'grommet/components/App'
import Grommet from 'grommet/components/Grommet'
import Header from 'grommet/components/Header'
import Sidebar from 'grommet/components/Sidebar'
import Split from 'grommet/components/Split'
import Title from 'grommet/components/Title'
import MenuIcon from 'grommet/components/icons/base/Menu'

import Routes from '../routes'
import LoginForm from '../login/components/LoginForm'
import SignUpForm from '../signup/components/SignUp'
import Menu from './Menu'
import { location } from '../utils'
import { getToken, isAdmin } from '../login'

import './App.scss'

export class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {sidebar: false}
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar () {
    this.setState({sidebar: !this.state.sidebar})
  }

  render () {
    const {token, isAdmin} = this.props

    if (location(this.props, 'signup')) {
      return <GrommetApp>
        <SignUpForm />
      </GrommetApp>
    }

    if (token === '' || location(this.props, 'login')) {
      return <GrommetApp>
        <LoginForm />
      </GrommetApp>
    }

    const title = isAdmin ? 'ISADMIN' : 'Grommet App'

    return <Grommet>
      <GrommetApp centered={false}>
        <Box>
          <Header colorIndex='neutral-2'>
            <Button id='App__menu-toggle' icon={<MenuIcon />} onClick={this.toggleSidebar} />
            <Title pad='small'>
            {title}
            </Title>
          </Header>
          <Split className='full-width' flex='right' priority={this.state.sidebar ? 'left' : 'right'}>
            <Sidebar colorIndex='neutral-1' pad='medium' size='small' onClick={this.toggleSidebar}>
              <Menu />
            </Sidebar>
            <Box
              justify='center'
              align='center'
              pad='medium'
            >
              <Routes />
            </Box>
          </Split>
        </Box>
      </GrommetApp>
    </Grommet>
  }
}

function mapStateToProps (state) {
  return {
    token: getToken(state),
    isAdmin: isAdmin(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
