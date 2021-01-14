import { React, useState, useEffect } from 'react';
import '../../style/App.scss';
import star from '../../img/star.svg';
import API from '../../api'

function FavoriteList(props) {
  const favoriteCatList = !props.catInfo
    ? []
    : props.catInfo.map((cat) => <FavoriteItem cat={cat} openModal={props.openModal}/>)

  return (
    <div className="home-favorite--list">
      {favoriteCatList}
    </div>
  )
}

function FavoriteItem(props) {
  const cat = props.cat;

  const formattedDate = formatDate(cat.date);

  return (
    <div className="home-favorite--icon" onClick={() => { props.openModal(cat) }}>
      <img className="home-favorite--img" src={cat.image} />
      <div className="home-favorite--day">	
        {formattedDate}
      </div>
    </div >
  )
}

function RecommendItem(props) {
  const cat = {
    image: props.catImage,
    date: undefined
  }

  return (
    <div className="home-recommend--icon" onClick={() => { props.openModal(cat) }}>
      <img className="home-recommend--img" src={cat.image} />
      <div className="home-recommend--button">
        <img className="home-recommend--svg" src={star} />
      </div>
    </div>
  )
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes =date.getMinutes();

  return `${year}/${month}/${day} ${hours}:${minutes}`
}

function Home(props) {
  const [catInfo, setCatInfo] = useState(undefined);

  async function loadCatData() {
    const catInfo = await API.loadCatData();
    setCatInfo(catInfo);
  }

  useEffect(() => {
    loadCatData()
  }, []);

  return (
    <div className="home-main">
      <div className="home-content">
        <div className="home-main--title">
          ホーム
        </div>
        <div className="home-recommend">
          <div className="home-recommend--title">
            本日のおすすめ
          </div>
          <RecommendItem
            catImage={props.recommendationImage}
            openModal={props.openModal}
          />
        </div>
        <div className="home-favorite">
          <div className="home-favorite--title">
            あなたのお気に入り
          </div>
          <FavoriteList
            catInfo={catInfo}
            openModal={props.openModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
