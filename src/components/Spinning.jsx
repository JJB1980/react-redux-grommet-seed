import React from 'react'

import Box from 'grommet/components/Box'
import GrommetSpinning from 'grommet/components/icons/Spinning'

export default function Spinning (props) {
  return <Box pad='large' align='center' margin={{top: 'large', bottom: 'large'}}>
    <GrommetSpinning />
  </Box>
}
