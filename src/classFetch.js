import axios from 'axios';

export class Fetch {
  #API_KEY = '31703269-63db8468fb2ed221e4e93ddb7';
  #BASE_URL = 'https://pixabay.com/api/';
  #PER_PAGE = 40;
  #page = 1;
  #inputValue = null;
  #totalCards = null;

  constructor() {}

  async fetchOnSubmit(q) {
    this.#page = 1;
    this.#inputValue = q;

    const params = {
      key: this.#API_KEY,
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.#PER_PAGE,
      page: this.#page,
    };

    const cards = await axios.get(this.#BASE_URL, { params });

    this.#totalCards = cards.data.totalHits;

    return cards.data.hits;
  }

  async fetchOnLoadMore() {
    this.#page += 1;

    const params = {
      key: this.#API_KEY,
      q: this.#inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.#PER_PAGE,
      page: this.#page,
    };

    const cards = await axios.get(this.#BASE_URL, { params });

    return cards.data.hits;
  }

  get totalCards() {
    return this.#totalCards;
  }

  get page() {
    return this.#page;
  }

  get PER_PAGE() {
    return this.#PER_PAGE;
  }

  get inputValue() {
    return this.#inputValue;
  }
}
