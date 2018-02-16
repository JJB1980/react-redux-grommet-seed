import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeName, getName } from '../index'
import './styles.scss'

const Home = ({ name, changeName }) => {
  function onChangeName (event) {
    changeName(event.target.value)
  }

  return (<div>
    <input value={name} type="text" onChange={onChangeName} />
    <p className="test">Hello {name}</p>
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

export default connect(
  (state) => ({
    name: getName(state)
  }),
  (dispatch) => bindActionCreators({ changeName }, dispatch)
)(Home)
