import React from 'react'
import { withRouter } from 'react-router-dom'

import GrommetAnchor from 'grommet/components/Anchor'
import Button from 'grommet/components/Button'

export function Anchor (props) {
  const {history, href, label, type, fill, onClick} = props

  function onClickAnchor () {
    history.push(href)
  }

  if (type === 'anchor') {
    return <GrommetAnchor onClick={onClick || onClickAnchor}>{label}</GrommetAnchor>
  }

  return <Button fill={fill} label={label} type={type} onClick={onClick || onClickAnchor} />
}

export default withRouter(Anchor)
