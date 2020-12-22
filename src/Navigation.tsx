import React from 'react';
import './style/App.scss';
import { Link } from 'react-router-dom';


function Navigation()  {
  return (
    <div className="navigator-main">
      <div className="navigator-title">
        <p >Your Fav Cats</p>
      </div>
      <div className="navigator-menu">
        <Link className="navigator-menu--link navigator-menu--item" to="/">ホーム</Link>
        <Link className="navigator-menu--link navigator-menu--item" to="/find">ねこをさがす</Link>
      </div>
    </div>
  );
}

export default Navigation;
