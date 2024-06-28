import React from 'react';
import {withStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

const myStyles=()=>{ return ({
    mainContainer: {
        flexGrow: 1,
        color: 'blue'
    },
    contentSection : {
        marginTop :"80px"
    },
    menuItems:{
       textDecoration:"none",
        "&:hover":{
            color:"white",
            background:"orange"
        },
        "&:active":{
            color:"white",
            background:"#a87b27"
        }
    }
})}

const Header=({classes})=>{
    const [anchorForMenu,setAnchorForMenu]=React.useState(null);
 
    const appBarMenuIconClickHandler=(ev)=>{
        setAnchorForMenu(ev.currentTarget);
    }
    const appBarMenuCloseHandler=()=>{
        setAnchorForMenu(null);
    }
    return (
        <div className={classes.mainContainer}>
            <AppBar>
                <Toolbar>
                    <IconButton color='inherit' onClick={appBarMenuIconClickHandler}>
                        <MenuIcon/>
                        </IconButton>
                        <Menu
                        anchorEl={anchorForMenu}
                        open={Boolean(anchorForMenu)}
                        onClose={appBarMenuCloseHandler}
                        >
                            <MenuItem className={classes.menuItems} onClick={appBarMenuCloseHandler}>
                            <Link to='./Items'>Items</Link>
                            </MenuItem>
                            <MenuItem className={classes.menuItems}
                            onClick={appBarMenuCloseHandler}
                            ><Link to='./Customers'>Customer</Link></MenuItem>
                            <MenuItem className={classes.menuItems}
                            onClick={appBarMenuCloseHandler}
                            ><Link to='./Traders'>Traders</Link></MenuItem>
                            <MenuItem className={classes.menuItems}
                            onClick={appBarMenuCloseHandler}
                            ><Link to='./Invoices'>Invoices</Link></MenuItem>
                        </Menu>
                </Toolbar>
            </AppBar>
            
        </div>
    )
}

export default withStyles(myStyles)(Header);