import { React, useState, useEffect } from 'react';
import serch from '../../img/serch.svg';
import '../../style/App.scss';
import star from '../../img/star.svg';
import API from '../../api'

function FindList(props) {
  const searchCatList = !props.searchCat
  ? []
  : props.searchCat.map((catList) => <SearchItem catList={catList} openModal={props.openModal}/>)
  
  return (
    <div className="find-list">
      {!props.searchCat
        ? (
          <div className="find-list--cat">
            <img className="find-list--img" src={serch} />
            <div className="find-list--text">
              あなたの気に入るねこを探してみよう
            </div>
          </div>
        )
        : (

          <div>
            <div className="find-list--keyword">
              キーワード:
            </div>
            <div className="find-list--search">
              {searchCatList}
            </div>
          </div>
        )
      }
    </div>
  )
}
  
function SearchItem(props) {
  const cat = {
    image: props.catList,
    date: undefined
  }

  return (
    <div className="home-search--icon" onClick={() => { props.openModal(cat) }}>
      <img className="home-recommend--img" src={cat.image} />
      <div className="home-recommend--button">
        <img className="home-recommend--svg" src={star} />
      </div>
    </div>
  )
}

function Find(props) {
  const [searchCat, setSearchCat] = useState(undefined);

  async function getCatImagesWithKeyword() {
    let keyword = document.getElementsByClassName('find-serch--input');

    console.log(keyword[0].value);

    const getSearchCat = await API.getCatImagesWithKeyword(10, keyword[0].value);
    console.log(getSearchCat);
    setSearchCat(getSearchCat);
  }

  function textChange(t) {
console.log(t)
  }

  return (
    <div className="find-main">
      <div className="find-content">
        <div className="find-main--title">
          ねこをさがす
        </div>
        <div className="find-serch">
          <input className="find-serch--input" placeholder="キーワード" onChange={() => textChange()} />
          <button className="find-serch--button" onClick={getCatImagesWithKeyword} >さがす</button>
        </div>
        <div className="find-line" />
        <FindList
          searchCat={searchCat}
          openModal={props.openModal}
          closeModal={props.closeModal}
        />
      </div>
    </div>
  );
}

export default Find;
