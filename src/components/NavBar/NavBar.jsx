import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function NavBar() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Divvy Tips</h2>
      </Link>

      { user.id && (<LogOutButton />) }
    </div>
  );
}

export default NavBar;