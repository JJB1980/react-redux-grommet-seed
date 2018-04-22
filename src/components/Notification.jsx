import React from 'react'

import Box from 'grommet/components/Box'
import GrommetNotification from 'grommet/components/Notification'

export default function Notification (props) {
  const {margin, message, state, status} = props

  return <Box margin={margin || 'small'}>
    <GrommetNotification status={status} message={message} state={state} />
  </Box>
}
