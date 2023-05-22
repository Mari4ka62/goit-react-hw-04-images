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
// export default class ImageGallery extends Component {
//   state = {
//     page: 1,
//     images: [],
//     isLoading: false,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevProps.value !== this.props.value ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({
//         isLoading: true,
//       });
//       fetchImages(this.props.value, this.state.page)
// .then(({ hits }) => {
//   if (hits.length === 0) {
//     alert('Enter the correct data for the request');
//   }
//           this.setState(prevState => ({
//             images: [...prevState.images, ...hits],
//           }));
//         })
//         .finally(() => {
//           this.setState({
//             isLoading: false,
//           });
//         });
//     }
//   }
//   nextPage = () => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//   };
//   // handleImgUrl = modalImageUrl => {
//   //   this.setState({ modalImageUrl });
//   //   this.props.openModal(this.state.modalImageUrl);
//   // };
//   render() {
// return (
//   <>
//     <Loader visible={this.state.isLoading} />
//     <ul className="ImageGallery">
//       {this.state.images &&
//         this.state.images.map(({ webformatURL, id, largeImageURL }) => (
//           <ImageGalleryItem
//             key={id}
//             webformatURL={webformatURL}
//             largeImageURL={largeImageURL}
//             openModal={this.props.openModal}
//           />
//         ))}
//     </ul>
//     {this.state.images.length > 0 && !this.state.isLoading && (
//       <ButtonLoadMore onClick={this.nextPage} />
//     )}
//   </>
// );
//   }
// }
ImageGallery.propTypes = {
  openModal: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.object),
};
