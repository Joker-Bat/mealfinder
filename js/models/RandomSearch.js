export default class RandomSearch {
    constructor () {
        this.id = 1
    }

  async getResults() {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.result = data;
      });
  }
}
