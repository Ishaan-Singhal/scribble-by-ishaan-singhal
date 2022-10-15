import axios from "axios";

const list = () => axios.get("/articles");

const show = slug => axios.get(`/articles/${slug}`);

const create = payload =>
  axios.post("/articles/", {
    article: payload,
  });

const update = ({ slug, payload }) =>
  axios.put(`/articles/${slug}`, {
    article: payload,
  });

const destroy = ({ slug, quiet }) => {
  const path = quiet ? `/articles/${slug}?quiet` : `/articles/${slug}`;

  return axios.delete(path);
};

const articlesApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default articlesApi;
