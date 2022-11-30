import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '31703269-63db8468fb2ed221e4e93ddb7';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;
let page = 1;
let inputValue = null;
let totalCards = null;

const form = document.querySelector('.search-form');
const loadButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

// По сабміту
form.addEventListener('submit', onSearchCards);

function onSearchCards(e) {
  e.preventDefault();

  gallery.innerHTML = '';

  page = 1;

  inputValue = e.currentTarget.elements.searchQuery.value;

  const params = {
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  loadButton.removeAttribute('disabled');

  axios.get(BASE_URL, { params }).then(cards => {
    console.log(cards.data.totalHits);

    totalCards = cards.data.totalHits;

    if (cards.data.hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notiflix.Notify.success(`"Hooray! We found ${totalCards} images."`);

    const markup = cards.data.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
          <a class="gallery__link" href="${largeImageURL}">
        <img
          src="${webformatURL}"
          alt="${tags}"
          class="gallery-pic"
          loading="lazy"
        />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
        </a>
      </div>`;
        }
      )
      .join(',');
    gallery.insertAdjacentHTML('beforeend', markup);

    gallerySLB.refresh();
  });
}

// Загрузити ще
loadButton.addEventListener('click', onLoadMoreCards);

function onLoadMoreCards() {
  if (totalCards <= page * PER_PAGE) {
    return Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  page += 1;

  const params = {
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  axios.get(BASE_URL, { params }).then(cards => {
    console.log(cards.data.totalHits);

    const markup = cards.data.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
          <a class="gallery__link" href="${largeImageURL}">
        <img
          src="${webformatURL}"
          alt="${tags}"
          class="gallery-pic"
          loading="lazy"
        />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
        </a>
      </div>`;
        }
      )
      .join(',');
    gallery.insertAdjacentHTML('beforeend', markup);

    gallerySLB.refresh();
  });
}

const gallerySLB = new simpleLightbox('.gallery a');

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

window.scrollBy(0, window.innerHeight);
