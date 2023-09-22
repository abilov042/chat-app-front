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
      <Link to={"/getall"}>
      <Button>GETALL</Button>
      </Link>
      <Menu.Item>
        <h1>{""}</h1>
      </Menu.Item>
    </Menu.Item>
  </Menu>
  )

}
  


export default MenuExampleButtons