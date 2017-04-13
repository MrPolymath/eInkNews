import React from 'react'
import AppBar from 'material-ui/AppBar'

const Header = (props) => {
  return (
    <div>
      <AppBar
        title="eink.news"
        style={{position: 'fixed'}}
        showMenuIconButton={false}
      />
    </div>
  )
}

export default Header
