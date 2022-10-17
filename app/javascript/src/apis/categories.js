import axios from "axios";

const list = () => axios.get("/categories");

const create = payload =>
  axios.post("/categories/", {
    category: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`/categories/${id}`, {
    category: payload,
  });

const destroy = ({ id, quiet }) => {
  const path = quiet ? `/categories/${id}?quiet` : `/categories/${id}`;

  return axios.delete(path);
};

const categoriesApi = {
  list,
  create,
  update,
  destroy,
};

export default categoriesApi;
