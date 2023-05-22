import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const handleSubmit = searchValue => setSearchValue(searchValue);

  const openModal = modalImageUrl => {
    setModalImageUrl(modalImageUrl);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery value={searchValue} openModal={openModal} />
      {showModal && <Modal modalImg={modalImageUrl} closeModal={closeModal} />}
    </div>
  );
}
