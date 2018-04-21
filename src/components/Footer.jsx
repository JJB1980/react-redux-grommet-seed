import React from 'react'

import Anchor from 'grommet/components/Anchor'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import GrrommetFooter from 'grommet/components/Footer'
import Paragraph from 'grommet/components/Paragraph'
import Title from 'grommet/components/Title'

import SocialMailIcon from 'grommet/components/icons/base/SocialMail'
import SocialTwitterIcon from 'grommet/components/icons/base/SocialTwitter'
import SocialFacebookIcon from 'grommet/components/icons/base/SocialFacebook'

import './Footer.scss'

export default function Footer () {
  return <GrrommetFooter justify='center' margin={{top: 'large'}} primary size='large' className='footer'>
    <Box direction='row'
      size='large'
      pad={{between: 'medium'}}
      margin={{left: 'medium', right: 'medium'}}
      responsive={false}
    >
      <Box size='large' full='horizontal' pad='small' flex >
        © 2018 Bowden Technology
      </Box>
      <Box
        className='footer-support'
        direction='row'
        flex
        justify='end'
        responsive={false}
      >
        <Button icon={<SocialMailIcon />} size='small' href='mailto:a@b.c'/>
        <Button icon={<SocialTwitterIcon />} href='https://twitter.com'/>
        <Button icon={<SocialFacebookIcon />} href='https://facebook.com'/>
      </Box>
    </Box>
  </GrrommetFooter>
}
