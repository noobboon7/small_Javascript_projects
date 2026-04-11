export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults()  {
    try {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      const data = await res.json();
      this.result = data.recipes;
      // console.log(this.result);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }

}
