import React from 'react'

import Box from 'grommet/components/Box'
import GrrommetFooter from 'grommet/components/Footer'
import Paragraph from 'grommet/components/Paragraph'
import Title from 'grommet/components/Title'

import './Footer.scss'

export default function Footer () {
  return <GrrommetFooter full align='center' justify='between' margin={{top: 'large'}} primary size='large' className='footer'>
    <Box direction='row'
      full
      pad={{between: 'medium'}}
      margin={{left: 'large'}}
    >
      <Paragraph margin='none' className='footer-copyright'>
        © 2018 Bowden Technology
      </Paragraph>
    </Box>
  </GrrommetFooter>
}
