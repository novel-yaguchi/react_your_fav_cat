import React from 'react';
import '../../style/App.scss';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import close from '../../img/ico_close.svg';
import star from '../../img/star.svg';
import API from '../../api'
import { useState, useEffect } from 'react';
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

// function removeFavorite(props) {
//   // if (!catInfo) {
//   //   return;
//   // };
// const cat = {
//   image: props.catImage,
//   date: undefined
// }

//   console.log(cat);
// const arr = [0, 1, 2, 3];
// const filtered_cat = cat.filter(v => v !== 1);

//   // const newCatInfo = catInfo.concat([{
//   //   image: recommendationImage,
//   //   date: new Date()
//   // }])

//   setCatInfo(filtered_cat);

//   API.saveCatData(filtered_cat);

//   props.closeModal();
// }


function ModalItem(props) {
  const cat = props.cat
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

function Home() {
  const [recommendationImage, setRecommendationImage] = useState('');
  const [catInfo, setCatInfo] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalCat, setModalCat] = useState({});

  async function getCatImage() {
    const image = await API.getCatImage();
    setRecommendationImage(image);
  }

  async function loadCatData() {
    const catInfo = await API.loadCatData();
    // console.log(catInfo)
    setCatInfo(catInfo);
  }

  useEffect(() => {
    getCatImage()
    loadCatData()
  }, []);


  function openModal(cat) {
    setIsOpen(true);
    setModalCat(cat);
  }

  function closeModal() {
    setIsOpen(false);
    setModalCat({});
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

  function removeFavorite() {
    const cat = {
      date: modalCat.date
    }
    
    console.log(modalCat);
    console.log(cat.date);

    console.log(catInfo);
    const filtered_cat = catInfo.filter(v => v !== cat.date);
    console.log(filtered_cat);

    // setCatInfo(filtered_cat);

    // API.saveCatData(filtered_cat);

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
            <img className="home-modal--cat" src={modalCat.image} />
          </div>
          <ModalItem
            saveFavorite={saveFavorite}
            removeFavorite={removeFavorite}
            closeModal={closeModal}
            cat={modalCat}
          />
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
          <RecommendItem
            catImage={recommendationImage}
            openModal={openModal}
          />
        </div>
        <div className="home-favorite">
          <div className="home-favorite--title">
            あなたのお気に入り
          </div>
          <FavoriteList
            catInfo={catInfo}
            openModal={openModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
