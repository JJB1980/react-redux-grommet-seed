import { List, Record } from 'immutable'

export const UsersState = new Record({
  users: List(),
  fetching: false,
  error: null
}, 'RegisterState')

export const UserRecord = new Record({
  id: '',
  firstname: '',
  lastname: '',
  mobile: '',
  email: '',
  admin: false
})

export function loadUsers (data) {
  let users = new List()

  data.forEach(user => {
    users = users.push(new UserRecord(user))
  })

  return users
}
