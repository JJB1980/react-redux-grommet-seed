import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'

import Box from 'grommet/components/Box'
import Form from 'grommet/components/Form'
import Heading from 'grommet/components/Heading'
import Table from 'grommet/components/Table'
import TableHeader from 'grommet/components/TableHeader'
import TableRow from 'grommet/components/TableRow'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Notification from '~/src/components/Notification'
import Spinning from '~/src/components/Spinning'

import {
  getUsers,
  isFetching,
  fetchUsers,
  getError,
  sortUsers
} from '../'
import {isSmall} from '~/src/components'

const labels = [
  ['Email', { sortable: true }],
  ['First name', { sortable: true }],
  ['Last name', { sortable: true }],
  ['Mobile', { sortable: false }],
  ['Admin', { sortable: true }]
]

export class UsersForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ascending: true,
      sortIndex: 0
    }

    this.sortFunction = this.sortFunction.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  sortFunction (which) {
    const {ascending} = this.state
    this.setState({ascending: !ascending, sortIndex: which})

    this.props.sortUsers(ascending, which)
  }

  render () {
    const {
      users,
      fetching,
      error,
      small,
      sortUsers
    } = this.props

    const {ascending, sortIndex} = this.state

    return <Box align='center'>
      <Form>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <Heading tag='h3'>Users</Heading>
        <Table responsive={small} className={classnames({'reposition-table': !small})}>
          <TableHeader
            labels={labels}
            sortIndex={0}
            sortAscending={ascending}
            sortIndex={sortIndex}
            onSort={this.sortFunction}
          />
          <tbody>
            {users.map(user => {
              return <TableRow key={user.id}>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.mobile}</td>
                <td>{user.admin ? 'yes' : 'no'}</td>
              </TableRow>
            })}
          </tbody>
        </Table>
        {error && <Notification status='warning' message={error} />}
        {fetching && <Spinning />}
      </Form>
    </Box>
  }
}

function mapStateToProps (state) {
  return {
    users: getUsers(state),
    fetching: isFetching(state),
    error: getError(state),
    small: isSmall(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUsers,
    sortUsers
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm)
