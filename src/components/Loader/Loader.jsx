import React from 'react';
import PropTypes from 'prop-types';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Loader = isLoading => {
  return (
    <div className="loaderDiv">
      <PropagateLoader loading={isLoading} color={'red'} />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
