import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link } from 'react-router-dom'

import { changeName, getName } from '../index'
import './styles.scss'

const Home = ({ name, changeName }) => {
  function onChangeName (event) {
    changeName(event.target.value)
  }

  return (<div>
    <input value={name} type='text' onChange={onChangeName} />
    <p className='test'>Hello {name}</p>
    <Link to='test/1'>something</Link>
  </div>)
}

Home.propTypes = {
  name: PropTypes.string,
  changeName: PropTypes.func
}

Home.defaultProps = {
  name: '',
  changeName: null
}

function mapStateToProps (state) {
  return {
    name: getName(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ changeName }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
