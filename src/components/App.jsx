import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    showModal: false,
    modalImageUrl: '',
  };
  handleSubmit = searchValue => {
    this.setState({ searchValue });
  };
  openModal = modalImageUrl => {
    this.setState({
      modalImageUrl,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          value={this.state.searchValue}
          openModal={this.openModal}
        />
        {this.state.showModal && (
          <Modal
            modalImg={this.state.modalImageUrl}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
