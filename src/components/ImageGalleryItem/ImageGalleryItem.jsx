import PropTypes from 'prop-types';
export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  openModal,
}) {
  return (
    <li className="ImageGalleryItem" onClick={() => openModal(largeImageURL)}>
      <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
};
