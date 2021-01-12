import { React, useState, useEffect } from 'react';
import serch from '../../img/serch.svg';
import '../../style/App.scss';
import Modal from 'react-modal';
import close from '../../img/ico_close.svg';
import star from '../../img/star.svg';
import API from '../../api'


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

function FindList(props) {
  // console.log('check1', props.searchCat);
  const searchCatList = !props.searchCat
  ? []
  : props.searchCat.map((catList) => <SearchItem catList={catList} openModal={props.openModal}/>)
  
  // console.log('check2', props.searchCat);
  return (
    <div className="find-list">
      {!props.searchCat
        ? (
          <div className="find-list--serch">
            <img className="find-list--img" src={serch} />
            <div className="find-list--text">
              あなたの気に入るねこを探してみよう
        </div>
          </div>
        )
        : (
          <div className="find-list--serch">
            <div className="home-favorite--list">
              {searchCatList}
            </div>
          </div>
        )
      }
    </div>
  )
}
  
function SearchItem(props) {
  const cat = props.catList;
  console.log('image', cat)

  // console.log('itemtest',catList);

  // const formattedDate = formatDate(cat.date);

  return (
    <div className="home-favorite--icon" onClick={() => { props.openModal(cat) }}>
      <img className="home-favorite--img" src={cat} />
    </div >
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

function Find() {
  const [recommendationImage, setRecommendationImage] = useState('');
  const [catInfo, setCatInfo] = useState(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalCat, setModalCat] = useState({});
  const [searchCat, setSearchCat] = useState(undefined);

  async function getCatImagesWithKeyword() {
    let keyword = document.getElementsByClassName('find-serch--input');

    console.log(keyword[0].value);

    const getSearchCat = await API.getCatImagesWithKeyword(10, keyword[0].value);
    console.log(searchCat);
    setSearchCat(getSearchCat);
  }

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
    console.log("お気に入り追加")
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
    <div className="find-main">
      {/* <div>
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
      </div> */}

      <div className="find-content">
        <div className="find-main--title">
          ねこをさがす
        </div>
        <div className="find-serch">
          <input className="find-serch--input" placeholder="キーワード" />
          <button className="find-serch--button" onClick={getCatImagesWithKeyword} >さがす</button>
        </div>
        <div className="find-line" />
        <FindList
          searchCat={searchCat}
          openModal={openModal}
        />
      </div>
    </div>
  );
}

export default Find;
