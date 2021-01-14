import { React, useState, useEffect } from 'react';
import serch from '../../img/serch.svg';
import '../../style/App.scss';
import star from '../../img/star.svg';
import API from '../../api'

function FindList(props) {
      console.log(props.favoriteList);
  const searchCatList = !props.searchCat
  ? []
    : props.searchCat.map((catList, idx) => <SearchItem catList={catList} openModal={props.openModal} idx={idx} favoriteList={props.favoriteList}/>)
  
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
              {props.searchText
                ? (
                  'キーワード:' + props.searchText
                  )
                  : (
                  'キーワード:なし'
                )
              }
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
    console.log(props.favoriteList[1]);
  console.log(props.idx, props.favoriteList[(props.idx)]);
  // console.log(props.catList);
  const cat = {
    image: props.catList,
    date: undefined,
    idx: props.idx
  }

  return (
    <div className="home-search--icon" onClick={() => { props.openModal(cat) }}>
      <img className="home-recommend--img" src={cat.image} />
      {props.searchText
        ? (
          <div className="home-recommend--button">
            <img className="home-recommend--svg" src={star} />
          </div>
        )
        : (
          <div className="home-recommend--button">
            <img className="home-recommend--svg" src={star} />
          </div>
        )
      }
    </div>
  )
}

function Find(props) {
  const [searchCat, setSearchCat] = useState(undefined);
  const [searchText, setSearchText] = useState('');
  // const [modalCat, setModalCat] = useState({});

  async function getCatImagesWithKeyword() {
    const getSearchCat = await API.getCatImagesWithKeyword(10, searchText);
    setSearchCat(getSearchCat);
  }

  function changeText(event) {
    setSearchText(event.target.value);
    console.log(event.target.value)
  }

  return (
    <div className="find-main">
      <div className="find-content">
        <div className="find-main--title">
          ねこをさがす
        </div>
        <div className="find-serch">
          <input className="find-serch--input" placeholder="キーワード" onChange={changeText} />
          <button className="find-serch--button" onClick={getCatImagesWithKeyword} >さがす</button>
        </div>
        <div className="find-line" />
        <FindList
          searchCat={searchCat}
          searchText={searchText}
          openModal={props.openModal}
          closeModal={props.closeModal}
          favoriteList={props.favoriteList}
        />
      </div>
    </div>
  );
}

export default Find;
