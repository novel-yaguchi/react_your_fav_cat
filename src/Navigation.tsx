import React from 'react';
import './style/App.scss';
import { NavLink, Link } from 'react-router-dom';


function Navigation()  {
  return (
    <div className="navigator-main">
      <div className="navigator-title">
        <p >Your Fav Cats</p>
      </div>
      <div className="navigator-menu">
        <NavLink className="navigator-menu--link navigator-menu--item" exact to="/">ホーム</NavLink>
        <NavLink className="navigator-menu--link navigator-menu--item" exact to="/find">ねこをさがす</NavLink>
      </div>
    </div>
  );
}

export default Navigation;
