import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import GrommetHeader from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import MenuIcon from 'grommet/components/icons/base/Menu'
import Menu from 'grommet/components/Menu'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'

import './Header.scss'

import Anchor from './Anchor'

import {getFirstname, getLastname, signOut} from '../login'

export function Header (props) {
  const {firstname, lastname, toggleSidebar, title, signOut} = props
  const name = `${firstname} ${lastname}`

  return <GrommetHeader colorIndex='neutral-2'>
    <List className='header'>
      <ListItem justify='between' separator={null}>
        <span>
          <Box responsive={false}>
            <Button id='App__menu-toggle' icon={<MenuIcon />} onClick={toggleSidebar} />
            <Title pad='small'>
              {title}
            </Title>
          </Box>
        </span>
        <span className='secondary'>
          <Menu label={name}>
            <Anchor label='Profile' type='anchor' href='/profile' />
            <Anchor onClick={signOut} type='anchor' label='Sign out' />
          </Menu>
        </span>
      </ListItem>
    </List>
  </GrommetHeader>
}

function mapStateToProps (state) {
  return {
    firstname: getFirstname(state),
    lastname: getLastname(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({signOut}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
