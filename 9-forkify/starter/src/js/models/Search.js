import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {

    const url = 'https://forkify-api.herokuapp.com';
    // const proxy = 'https://cors-anywhere.herokuapp.com/';  // not needed with this URL
    try {
      const res = await axios(`${url}/api/search?q=${this.query}`);
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch(error) {
      alert(error);
    }
  }
}
