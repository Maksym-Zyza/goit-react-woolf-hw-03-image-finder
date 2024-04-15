import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19779952-34022b0aec99bb73ff26dde3b';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const getImg = async ({ q = '', page = 1 }) => {
  try {
    const { data } = await axios.get('', { params: { q, page } });
    return data;
  } catch (error) {
    alert(error);
    return [];
  }
};

getImg.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default getImg;

// ===============
// const getImg = ({ q, page = 1 }) => {
//   return axios.get('', { params: { q, page } }).then(res => res.data.hits);
// };

// ===============
// const key = '19779952-34022b0aec99bb73ff26dde3b';

// const getImg = ({ q = '', page = 1 }) => {
//   return axios.get(
//     `https://pixabay.com/api/?q=${q}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
//   );
// };

// getImg(options)
//  .then(resp => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...resp.data.hits],
//           page: prevState.page + 1,
//         }));
//       })
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
