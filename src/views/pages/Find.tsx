import React from 'react';
import serch from '../../img/serch.svg';
import '../../style/App.scss';

function Find() {
  return (
    <div className="find-main">
      <div className="find-content">
        <div className="find-main--title">
          ねこをさがす
        </div>
        <div className="find-serch">
          <input className="find-serch--input" placeholder="キーワード" />
          <button className="find-serch--button">さがす</button>
        </div>
        <div className="find-line" />
        <div className="find-list">
          <div className="find-list--serch">
            <img className="find-list--img" src={serch} />
            <div  className="find-list--text">
              あなたの気に入るねこを探してみよう
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Find;
