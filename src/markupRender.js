import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Fetch } from './classFetch';
import {
  createMarkup,
  cleanGallery,
  hideButton,
  showButton,
  notifyFailure,
  notifySuccess,
  notifyInfo,
} from './functionForMarkRend';

// DOM
const form = document.querySelector('.search-form');
const loadButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
// Class
const fetch = new Fetch();

form.addEventListener('submit', onSearchCards);

async function onSearchCards(e) {
  e.preventDefault();

  // Змінні
  const inputValue = e.currentTarget.elements.searchQuery.value;
  const cards = await fetch.fetchOnSubmit(inputValue);

  // Якщо нічого не прийшло
  if (cards.length === 0) {
    return notifyFailure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  cleanGallery(gallery);

  // Кнока Load more
  const buttonIsHiden = loadButton.style.display === 'none';
  if (buttonIsHiden) {
    showButton(loadButton);
  }
  loadButton.classList.remove('disable');
  loadButton.removeAttribute('disabled');

  // DOM
  const markup = createMarkup(cards);
  gallery.insertAdjacentHTML('beforeend', markup);

  // simpleLightbox
  gallerySLB.refresh();

  notifySuccess(`Hooray! We found ${fetch.totalCards} images.`);

  if (fetch.totalCards <= fetch.page * fetch.PER_PAGE) {
    hideButton(loadButton);
  }
}

loadButton.addEventListener('click', onLoadMoreCards);

async function onLoadMoreCards() {
  const cards = await fetch.fetchOnLoadMore(fetch.inputValue);

  // DOM
  const markup = createMarkup(cards);
  gallery.insertAdjacentHTML('beforeend', markup);

  // simpleLightbox
  gallerySLB.refresh();

  if (fetch.totalCards <= fetch.page * fetch.PER_PAGE) {
    hideButton(loadButton);

    return notifyInfo(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

const gallerySLB = new simpleLightbox('.gallery a');
