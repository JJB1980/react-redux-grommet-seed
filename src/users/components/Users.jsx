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
  getError,
  sortUsers
} from '../'
import {isSmall} from '~/src/login'

export class UsersForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      ascending: true
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  render () {
    const {
      users,
      fetching,
      error,
      small,
      sortUsers
    } = this.props

    const sortFunction = () => {
      const {ascending} = this.state
      this.setState({ascending: !ascending})
      sortUsers(ascending)
    }

    return <Box align='center'>
      <Form>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <Heading tag='h3'>Users</Heading>
        <Table responsive={small}>
          <TableHeader
            labels={['Email', 'First name', 'Last name', 'Mobile', 'Admin']}
            sortIndex={0}
            sortAscending={this.state.ascending}
            onSort={sortFunction}
          />
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
