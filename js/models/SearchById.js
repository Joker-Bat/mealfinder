export default class SearchById {
  constructor(id) {
    this.id = id;
  }

  async getResults() {
    const url =
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + this.id;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.result = data;
      });
  }
}
