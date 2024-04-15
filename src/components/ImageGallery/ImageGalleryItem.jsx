import React from 'react';
import PropTypes from 'prop-types';
import defaultImage from './default.jpg';

class ImageGalleryItem extends React.Component {
  static defaultProps = {
    webformatURL: defaultImage,
    largeImageURL: defaultImage,
  };

  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  render() {
    const { webformatURL, tags, largeImageURL, onClick } = this.props;

    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          data-img={largeImageURL}
          onClick={() => onClick(webformatURL, tags)}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
