import React from 'react';
import cat from '../../img/cat.png';
// import Modal from './Modal';
// import Modalyou from './Modalyou';
import '../../style/App.scss';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import close from '../../img/ico_close.svg';
import star from '../../img/star.svg';
import { reduceEachTrailingCommentRange } from 'typescript';
import { findByLabelText } from '@testing-library/react';
import API from '../../api'

const customStyles = {
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: '70%',
    width: '70%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)"
  }
};

async function Home() {

  var subtitle: any;

  const s: any = await API.getCatImage();
  <img src={s} />

  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <div className="home-main">
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <div className="home-modal--back" onClick={closeModal}>
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
            <img className="home-recommend--img" src={cat} />
            <div className="home-recommend--button">
              <img className="home-recommend--svg" src={star} />
            </div>
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
