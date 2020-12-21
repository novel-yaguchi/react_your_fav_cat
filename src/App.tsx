import React from 'react';
import logo from './logo.svg';
import cat from './cat.png';
import './App.css';
import './App.js';
import Nabvar from './Navbar.js';
function App() {
  return (

    <div className="App">
          {/* <div>Nabvar</div>< */}
        <div className="navigator-main">
          <div className="navigator-title">
            <p >Your Fav Cats</p>
          </div>
          <div className="navigator-menu">
            <text className="navigator-menu--link navigator-menu--item" to="/">ホーム</text>
            <text className="navigator-menu--link navigator-menu--item" to="/find">ねこをさがす</text>
          </div>
        </div>
        <div className="home-main">
            <div className="home-content">
              <div className="home-main--title">
                ホーム
              </div>
              <div className="home-recommend">
                <div className="home-recommend--title">
                  本日のおすすめ
                </div>
                <div className="home-recommend--icon">
                  <img className="home-recommend--img" src={cat} />
                  {/* <div className="home-recommend--button"> */}
                {/* <img className="home-recommend--svg" src={cat} /> */}
                {/* </div> */}
                </div>
              </div>
              <div className="home-favorite">
                <div className="home-favorite--title">
                  あなたのお気に入り
                </div>
                <div className="home-favorite--list">
                  <div className="home-favorite--icon">
                    <img className="home-favorite--img" src={cat} />
                    <div className="home-favorite--day">
                      2020/10/27 10:00
                    </div>
                  </div>
                  <div className="home-favorite--icon">
                    <img className="home-favorite--img" src={cat} />
                    <div className="home-favorite--day">
                      2020/10/27 10:00
                    </div>
                  </div>
                  <div className="home-favorite--icon">
                    <img className="home-favorite--img" src={cat} />
                    <div className="home-favorite--day">
                      2020/10/27 10:00
                    </div>
                  </div>
                  <div className="home-favorite--icon">
                    <img className="home-favorite--img" src={cat} />
                    <div className="home-favorite--day">
                      2020/10/27 10:00
                    </div>
                  </div>
                  <div className="home-favorite--icon">
                    <img className="home-favorite--img" src={cat} />
                    <div className="home-favorite--day">
                      2020/10/27 10:00
                    </div>
                  </div>
                  <div className="home-favorite--icon">
                    <img className="home-favorite--img" src={cat} />
                    <div className="home-favorite--day">
                      2020/10/27 10:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default App;
