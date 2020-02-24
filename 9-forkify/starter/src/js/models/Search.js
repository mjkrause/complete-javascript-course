import axios from 'axios';
import { url } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {

    // const proxy = 'https://cors-anywhere.herokuapp.com/';  // not needed with this URL

    // For error handling we need to use the try/catch construct.
    try {
      const res = await axios(`${url}/api/search?q=${this.query}`);
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch(error) {
      alert(error);
    }
  }

}
