import React from 'react'

import Box from 'grommet/components/Box'

import './HelpText.scss'

export default function HelpText (props) {
  return <Box pad='small' className='help-text'>{props.children}</Box>
}
