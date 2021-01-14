import React from 'react';
import './style/App.scss';
import Navigation from './Navigation';
import Home from './views/pages/Home.jsx';
import Find from './views/pages/Find';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Modal from 'react-modal';
import close from './img/ico_close.svg';
import star from './img/star.svg';
import API from './api'
import { useState, useEffect } from 'react';

const customStyles = {
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '40px',
    marginRight: '-50%',
    height: '80%',
    width: '64%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)"
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes =date.getMinutes();

  return `${year}/${month}/${day} ${hours}:${minutes}`
}

function ModalItem(props) {
  const cat = props.cat
  console.log(cat)

  return (
    <div className="home-modal--item">
      {cat.date
        ? (
          <>
            <div className="home-modal--favorite">
              <div className="home-modal--favorite--text">
                お気に入り登録日
                    </div>
              <div className="home-modal--favorite--date">
                { formatDate(cat.date)}
              </div>
            </div>
            <div className="home-modal--button" onClick={props.removeFavorite}>
              <div className="home-modal--icon">
                <div className="home-modal--removebutton">
                  <img className="home-modal--favoriteimg" src={star} />
                  <div className="home-modal--text" >お気に入りからはずす</div>
                </div>
              </div>
            </div>
          </>
        )
        : (
          <div className="home-modal--button" onClick={props.saveFavorite}>
            <div className="home-modal--icon">
              <div className="home-modal--favoritebutton">
                <img className="home-modal--favoriteimg" src={star} />
                <div className="home-modal--text" >お気に入りに追加する</div>
              </div>
            </div> 
          </div>
        )
      }
    </div>
  )
}

function App() {
  const [recommendationImage, setRecommendationImage] = useState('');
  const [catInfo, setCatInfo] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalCat, setModalCat] = useState({});
  const [favoriteList, setFavoriteList] = useState([10]);

  async function getCatImage() {
    const image = await API.getCatImage();
    setRecommendationImage(image);
  }

  async function loadCatData() {
    const catInfo = await API.loadCatData();
    setCatInfo(catInfo);
  }

  useEffect(() => {
    getCatImage()
    loadCatData()
  }, []);

  function openModal(cat) {
    // console.log(cat);
    setIsOpen(true);
    setModalCat(cat);
  }

  function closeModal() {
    setIsOpen(false);
    setModalCat({});
  }

  function saveFavorite() {

    console.log('リスト デフォルト', favoriteList)
    console.log('チェック対象番目', modalCat.idx)

    let newFavoriteList = [true, 0]
    setFavoriteList(newFavoriteList);

    console.log('リスト セット後', favoriteList)

    // setFavoriteList(modalCat.idx);
    
    if (!catInfo) {
      return;
    };
    const newCatInfo = catInfo.concat([{
      image: recommendationImage,
      date: new Date()
    }])

    setCatInfo(newCatInfo);

    API.saveCatData(newCatInfo);

    closeModal();
  }

  function removeFavorite() {
    const cat = {
      date: modalCat.date
    }

    const filtered_cat = catInfo.filter(v => v.date.getTime() !== cat.date.getTime());
    
    setCatInfo(filtered_cat);

    API.saveCatData(filtered_cat);

    closeModal();
  }

  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="home-modal--back" onClick={closeModal}>
          <img src={close} />
        </div>
        <div className="home-modal--img">
          <img className="home-modal--cat" src={modalCat.image} />
          {/* {modalCat} */}
        </div>
        <ModalItem
          saveFavorite={saveFavorite}
          removeFavorite={removeFavorite}
          closeModal={closeModal}
          cat={modalCat}
        />
      </Modal>
      <Router>
        <Route path="/" component={Navigation} />
        <Route path="/" exact render={() => <Home
          openModal={openModal}
          closeModal={closeModal}
        />} />
        <Route path="/find" exact render={() => <Find
          openModal={openModal}
          closeModal={closeModal}
          favoriteList={favoriteList}
        />} />
      </Router>
    </div>
  );
}

export default App;
