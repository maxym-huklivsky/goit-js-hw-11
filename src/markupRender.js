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

  cleanGallery(gallery);

  // Змінні
  const inputValue = e.currentTarget.elements.searchQuery.value.trim();

  if (inputValue === '') {
    return notifyFailure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  let cards;
  try {
    cards = await fetch.fetchOnSubmit(inputValue);
  } catch (error) {
    notifyFailure(`Error: ${error.name}`);
  }

  // Якщо нічого не прийшло
  if (cards.length === 0) {
    return notifyFailure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  // Кнока Load more
  showButton(loadButton);

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
  let cards;
  try {
    cards = await fetch.fetchOnLoadMore(fetch.inputValue);
  } catch (error) {
    notifyFailure(`Error: ${error.name}`);
  }

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
