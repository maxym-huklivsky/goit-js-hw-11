import axios from 'axios';
import { Notify } from 'notiflix';
import simpleLightbox from 'simplelightbox';

const API_KEY = '31703269-63db8468fb2ed221e4e93ddb7';
const BASE_URL = 'https://pixabay.com/api';

const form = document.querySelector('.search-form');

form.addEventListener('submit', onSearchPosts);

function onSearchPosts(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.elements.searchQuery.value;

  const params = {
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  axios.get(BASE_URL, { params }).then(data => console.log(data));
}
