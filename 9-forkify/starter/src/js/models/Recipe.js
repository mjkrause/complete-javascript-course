import axios from 'axios';
import { url } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {

    //const url = 'https://forkify-api.herokuapp.com';

    try {
      const res = await axios (`${url}/api/get?rId=${this.id}`);
      console.log(res);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
       console.log(error);
       alert("Something went wrong :(")
    }
  };

  calcTime() {
    // Assume we need 15 min for each 3 ingredients.
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;

  };

  calcServings() {
    this.servings = 4;
  }
}
