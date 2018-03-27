import React from 'react'

import Box from 'grommet/components/Box'
import GrommetNotification from 'grommet/components/Notification'

export default function Notification (props) {
  return <Box pad='small'>
    <GrommetNotification {...props} />
  </Box>
}
