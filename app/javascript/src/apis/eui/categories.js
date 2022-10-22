import axios from "axios";

const list = () => axios.get("/public/categories");

const euiCategoriesApi = {
  list,
};

export default euiCategoriesApi;
