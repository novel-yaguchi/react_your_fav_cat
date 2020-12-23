import React from 'react';
import cat from '../../img/cat.png';
import Modal from './Modal';
import '../../style/App.scss';

function Home() {
  return (
    <div className="home-main">
      {/* <Modal /> */}
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
  );
}

export default Home;
