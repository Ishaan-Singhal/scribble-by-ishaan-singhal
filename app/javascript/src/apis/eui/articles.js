import axios from "axios";

const show = slug => axios.get(`/public/articles/${slug}`);

const euiArticlesApi = {
  show,
};

export default euiArticlesApi;
