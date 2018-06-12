import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import classnames from 'classnames'

import Box from 'grommet/components/Box'
import GrommetApp from 'grommet/components/App'
import Grommet from 'grommet/components/Grommet'
import Sidebar from 'grommet/components/Sidebar'
import Split from 'grommet/components/Split'

import AuthRoutes from '../routesAuth'
import Footer from './Footer'
import ForgotPassword from '../forgotPassword/components/ForgotPassword'
import Header from '../components/Header'
import LoginForm from '../login/components/LoginForm'
import Menu from './Menu'
import RegisterForm from '../register/components/Register'
import Routes from '../routes'
import Spinning from '../components/Spinning'

import { location } from '../utils'
import { getToken, isAdmin, isInitializing } from '../login'
import { isSmall } from '../components'

import './App.scss'

export class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {sidebar: false}
    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  componentWillUpdate (nextProps) {
    const {history, token} = nextProps

    if ((location(nextProps, /(\/login$)/) ||
        location(nextProps, /(\/resetPassword)/) ||
        location(nextProps, /(\/requestResetPassword$)/) ||
        location(nextProps, /(\/register$)/)) && token) {
      history.push('/')
    }
  }

  toggleSidebar () {
    this.setState({sidebar: !this.state.sidebar})
  }

  render () {
    const {token, isAdmin, initializing, isSmall} = this.props

    if (initializing) {
      return <GrommetApp>
        <Spinning />
        <Footer />
      </GrommetApp>
    }

    if (token === '') {
      return <GrommetApp>
        <AuthRoutes />
        <Footer />
     </GrommetApp>
    }

    const title = isAdmin ? 'ISADMIN' : 'Grommet App'

    return <Grommet>
      <GrommetApp centered={false}>
        <Box>
          <Header toggleSidebar={this.toggleSidebar} title={title} />
          <Split className='full-width' fixed flex='right' priority={this.state.sidebar ? 'left' : 'right'}>
            <Sidebar colorIndex='neutral-1' pad='medium' size='small' onClick={this.toggleSidebar}>
              <Menu />
            </Sidebar>
            <Box
              justify='center'
              pad='medium'
              responsive
              full='horizontal'
            >
              <Box
                className={classnames({'realign-content': !isSmall})}
              >
                <Routes isAdmin={isAdmin} />
              </Box>
              <Footer />
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
    isAdmin: isAdmin(state),
    initializing: isInitializing(state),
    isSmall: isSmall(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
