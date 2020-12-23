import React from 'react';
import cat from '../../img/cat.png';
import star from '../../img/star.svg';
import close from '../../img/ico_close.svg';
import '../../style/App.scss';

function Modal() {
  return (
    <div className="home-content">
      <div id="overlay">
        <div className="home-modal">
          <div className="home-modal--back">
            <img src={close} />
          </div>
          <div className="home-modal--img">
            <img className="home-modal--cat" src={cat} />
          </div>
          <div className="home-modal--button">
            <div className="home-modal--icon">
              <div className="home-modal--favoritebutton">
                <img className="home-modal--favoriteimg" src={star} />
                <div className="home-modal--text">お気に入りに追加する</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
