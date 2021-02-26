export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.query}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => (this.result = data));
  }
}