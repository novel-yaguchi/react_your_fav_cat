import React from 'react';
import '../../style/App.scss';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import close from '../../img/ico_close.svg';
import star from '../../img/star.svg';
import { reduceEachTrailingCommentRange } from 'typescript';
import { findByLabelText } from '@testing-library/react';
import API from '../../api'
import { useState, useEffect } from 'react';
import { setupMaster } from 'cluster';
import { Data } from "../../api/pseudo_handler";

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

function Home() {
  const [recommendationImage, setRecommendationImage] = useState('');
  const [catInfo , setCatInfo] = useState<Data>(undefined);

  async function getCatImage() {
    const image = await API.getCatImage();
    setRecommendationImage(image);
  }

  async function loadCatData() {
    const catInfo = await API.loadCatData();
    console.log(catInfo)
    setCatInfo(catInfo);
  }

  let listItems;

  if (catInfo) {
    listItems = catInfo.map((cat) =>
      <div className="home-favorite--icon" onClick={openModal}>
        <img className="home-favorite--img" src={cat.image} />
        <div className="home-favorite--day">{cat.date.getFullYear()}/{cat.date.getMonth()}/{cat.date.getDate()} {cat.date.getHours()}:{cat.date.getMinutes()}</div>
      </div >
    );
  }
  

  function FavoriteList(props: { catInfo: any[]; openModal: any; }) {
    const favoriteCatList = !props.catInfo
      ? []
      : props.catInfo.map((cat: any) => <FavoriteItem cat={cat} openModal={props.openModal}/>)

    return (
      <div className="home-favorite--list">
        {favoriteCatList}
      </div>
    )
  }

  function FavoriteItem(props: { cat: any; openModal: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined; }) {
    const cat = props.cat;

    const formattedDate = formatDate(cat.date);

    return (
      <div className="home-favorite--icon" onClick={props.openModal}>
        <img className="home-favorite--img" src={cat.image} />
        <div className="home-favorite--day">	
          {formattedDate}
        </div>
      </div >
    )
  }

  function formatDate(date: { getFullYear: () => any; getMonth: () => any; getDate: () => { (): any; new(): any; }; getHours: () => any; getMinutes: () => any; }) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()();
    const hours = date.getHours();
    const minutes =date.getMinutes();

    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

  useEffect(() => {
    getCatImage()
    loadCatData()
  }, []);

  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function saveFavorite() {
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

  return (
    <div className="home-main">
      <div>
        {/* <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="home-modal--back" onClick={closeModal}>
            <img src={close} />
          </div>
          <div className="home-modal--img">
            <img className="home-modal--cat" src={recommendationImage} />
          </div>
          <div className="home-modal--button" onClick={saveFavorite}>
            <div className="home-modal--icon">
              <div className="home-modal--favoritebutton">
                <img className="home-modal--favoriteimg" src={star} />
                <div className="home-modal--text" >お気に入りに追加する</div>
              </div>
            </div> 
          </div>
        </Modal> */}
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
            <img className="home-modal--cat" src={recommendationImage} />
          </div>
          <div className="home-modal--item">
            
            <div className="home-modal--favorite">
              <div className="home-modal--favorite--text">
                お気に入り登録日
              </div>
              <div className="home-modal--favorite--date">
                2020/11/25 15:42
                {/* <div className="home-favorite--day">{cat.date.getFullYear()}/{cat.date.getMonth()}/{cat.date.getDate()} {cat.date.getHours()}:{cat.date.getMinutes()}</div> */}
              </div>
            </div>

            <div className="home-modal--button" onClick={saveFavorite}>
              <div className="home-modal--icon">
                <div className="home-modal--removebutton">
                  <img className="home-modal--favoriteimg" src={star} />
                  <div className="home-modal--text" >お気に入りからはずす</div>
                </div>
              </div> 
            </div>
          </div>
        </Modal>
      </div>

      <div className="home-content">
        <div className="home-main--title">
          ホーム
        </div>
        <div className="home-recommend">
          <div className="home-recommend--title">
            本日のおすすめ
          </div>
          <div className="home-recommend--icon" onClick={openModal}>
            <img className="home-recommend--img" src={recommendationImage} />
            <div className="home-recommend--button">
              <img className="home-recommend--svg" src={star} />
            </div>
          </div>
        </div>
        <div className="home-favorite">
          <div className="home-favorite--title">
            あなたのお気に入り
          </div>
          {/* <FavoriteList
            catInfo={catInfo}
            openModal={openModal}/> */}
          <div className="home-favorite--list">
            { listItems }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
