import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
  getError
} from '../'

export class UsersForm extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render () {
    const {
      users,
      fetching,
      error
    } = this.props

    return <Box align='center'>
      <Form>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <Heading tag='h3'>Users</Heading>
        <Table>
          <TableHeader labels={['Email', 'First name', 'Last name', 'Mobile', 'Admin']} />
          <tbody>
            {users.map(user => {
              return <TableRow key={user.id}>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.mobile}</td>
                <td>{user.admin}</td>
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
    error: getError(state)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUsers
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersForm)
