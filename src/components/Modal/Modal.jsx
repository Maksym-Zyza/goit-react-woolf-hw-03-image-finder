import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  static propTypes = PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    onClose: PropTypes.func,
  }).isRequired;

  state = {
    isLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyClose);
  }

  handleKeyClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  onImgLoad = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { src, alt } = this.props;
    const { isLoading } = this.state;

    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClose}>
        <div className="Modal">
          <img src={src} alt={alt} onLoad={this.onImgLoad} />

          {isLoading && <Loader isLoading={isLoading} />}
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
