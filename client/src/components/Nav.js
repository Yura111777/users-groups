import React from "react";
import {NavLink} from "react-router-dom";

const Navs = () => {
    return (
        <div className='py-5'>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink to='/' className='nav-link'>Users</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/groups' className='nav-link'>Groups</NavLink>
                </li>
            </ul>


        </div>
    )
}

export default Navs;