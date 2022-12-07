import React, {useState} from "react";
import {Link} from 'react-router-dom'
import AuthUser from "../login/AuthUser.js";

import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.js';

import { BsArrowsFullscreen,
         BsPersonCircle } from "react-icons/bs";

import "./sidebars.js"
import "./index.css"

import avatar from './avatar.png'

function Menu() {

    const {user,token,logout} = AuthUser();
    
    const logoutUser = () => {
      if(token != undefined){
        logout();
      }
    }

    const [isActive, setIsActive] = useState(false);

    const handleClick = event => {
      const actives = document.querySelectorAll('.active')
      actives.forEach(act => {
          act.classList.remove('active')
      })
      setIsActive(current => !current);
    };

  
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light divmenu">
      <Link to="/" className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none' onClick={handleClick}>
        <BsArrowsFullscreen size='32' />
        <span className="fs-4 p-3">Menu</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/customers" className={isActive ? "nav-link link-dark active":"nav-link link-dark"} onClick={handleClick}>
            <BsPersonCircle size='30' /> <strong>Customers</strong>
          </Link>
        </li>
      </ul>


      <span><small>{user.email}</small></span>
      <hr />
      <div className="dropdown">
        <Link href="/logout" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img src={avatar} alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>{user.name}</strong>
        </Link>
        <ul className="dropdown-menu text-small shadow">
          <li><a className="dropdown-item" onClick={logoutUser}>Sign out</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Menu;
