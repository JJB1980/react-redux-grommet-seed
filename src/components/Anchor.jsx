import React from 'react'
import { withRouter } from 'react-router-dom'

import Button from 'grommet/components/Button'

export function Anchor (props) {
  const {history, href, label, type, fill} = props

  function onClickAnchor () {
    history.push(href)
  }

  return <Button fill={fill} label={label} type={type} onClick={onClickAnchor} />
}

export default withRouter(Anchor)
