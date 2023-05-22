import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34988018-026f4de83fc2116d0280b55fb';
export default async function fetchImages(searchText, pageNumber) {
  const response = await axios.get(
    `/?q=${searchText}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
