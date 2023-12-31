import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const MenuExampleButtons = () => {

  
  
  return(
    
  <Menu>
    <Menu.Item>
      <Link to={"/signup"}>
      <Button primary>Sign up</Button>
      </Link>
     
    </Menu.Item>

    <Menu.Item>
      <Link to={"/signin"}>
      <Button>Log-in</Button>
      </Link>
      
    </Menu.Item>
    <Menu.Item>
      <Link to={"/chatRoom"}>
      <Button>ChatRoom</Button>
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={"/"}>
      <Button>Home</Button>
      </Link>
    </Menu.Item>
  </Menu>
  )

}
  


export default MenuExampleButtons