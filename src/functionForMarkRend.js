import Notiflix from 'notiflix';

function createMarkup(data) {
  return data
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
    .join('');
}

function cleanGallery(el) {
  el.innerHTML = '';
}

function hideButton(btn) {
  btn.style.display = 'none';
}

function showButton(btn) {
  loadButton.style.display = 'block';
}

function notifyFailure(message) {
  Notiflix.Notify.failure(message);
}

function notifySuccess(message) {
  Notiflix.Notify.success(message);
}

function notifyInfo(message) {
  Notiflix.Notify.info(message);
}

export {
  createMarkup,
  cleanGallery,
  hideButton,
  showButton,
  notifyFailure,
  notifySuccess,
  notifyInfo,
};
