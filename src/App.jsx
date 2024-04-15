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
    renderBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
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
      .then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          renderBtn: this.state.page < Math.ceil(totalHits / 12),
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  changePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImgClick = (src, alt) => {
    this.setState({ largeImg: { src, alt } });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, isLoading, showModal, error, renderBtn } = this.state;
    const { src, alt } = this.state.largeImg;
    const nothing = images.length === 0;

    return (
      <div>
        <SearchBar onSubmit={this.formSubmitQuery} />

        <ImageGallery images={images} onClick={this.onImgClick} />

        {isLoading && <Loader isLoading={isLoading} />}

        {renderBtn && <Button onClick={this.changePage} scroll={scrollTo()} />}

        {showModal && <Modal src={src} alt={alt} onClose={this.toggleModal} />}

        {error && <h1>{error}</h1>}

        {nothing && <h2>Nothing, please start your search</h2>}
      </div>
    );
  }
}

export default App;
