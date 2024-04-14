import React from 'react';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import getImg from './services/imgAPI';
import Modal from './components/Modal';
import Loader from './components/Loader';
import scrollTo from './services/scrollTo';
import './styles.css';

class App extends React.Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImg: { src: '', alt: '' },
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  formSubmitQuery = query => {
    this.setState({ searchQuery: query, images: [], page: 1, error: null });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    const q = searchQuery;
    const options = { q, page };
    this.setState({ isLoading: true });

    getImg(options)
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onImgClick = e => {
    const src = e.target.dataset.img;
    const alt = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState({ largeImg: { src, alt } });
    }

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, isLoading, showModal, error } = this.state;
    const { src, alt } = this.state.largeImg;
    const renderBtn = images.length > 0 && !isLoading;
    const nothing = images.length === 0;
    console.log(images);

    return (
      <div>
        <SearchBar onSubmit={this.formSubmitQuery} />

        <ImageGallery images={images} onClick={this.onImgClick} />

        {isLoading && <Loader isLoading={isLoading} />}

        {renderBtn && <Button onClick={this.fetchImages} scroll={scrollTo()} />}

        {showModal && <Modal src={src} alt={alt} onClose={this.toggleModal} />}

        {error && <h1>{error}</h1>}

        {nothing && <h2>Nothing, please start your search</h2>}
      </div>
    );
  }
}

export default App;
