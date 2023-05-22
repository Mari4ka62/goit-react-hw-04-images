import { useState, useEffect } from 'react';
import fetchImages from 'services/getImages';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import ButtonLoadMore from 'components/ButtonLoadMore/ButtonLoadMore';

export default function ImageGallery({ value, openModal }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }
    setIsLoading(true);
    fetchImages(value, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          alert('Enter the correct data for the request');
        }
        setImages(images => [...images, ...hits]);
      })
      .finally(setIsLoading(false));
  }, [value, page]);
  const nextPage = () => {
    setPage(page => page + 1);
  };
  return (
    <>
      <Loader visible={isLoading} />
      <ul className="ImageGallery">
        {images &&
          images.map(({ webformatURL, id, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              openModal={openModal}
            />
          ))}
      </ul>
      {images.length > 0 && !isLoading && <ButtonLoadMore onClick={nextPage} />}
    </>
  );
}
ImageGallery.propTypes = {
  openModal: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.object),
};
