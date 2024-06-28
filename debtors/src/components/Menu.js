import React from  'react';
import {Link} from 'react-router-dom';

const Menu=()=>{
 return(
   <nav>
        <ul>
            <li>
                <Link to='./Items'>Items</Link>
            </li>
            <li>
                <Link to='./Customers'>Customers</Link>
            </li>
            <li>
                <Link to='./Traders'>Traders</Link>
            </li>
        </ul>
    </nav>
 );
}

export default Menu;