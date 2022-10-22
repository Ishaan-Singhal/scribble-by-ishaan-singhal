import axios from "axios";

const show = () => axios.get("/organization");

const update = payload => axios.put("/organization", payload);

const organizationApi = {
  show,
  update,
};
export default organizationApi;
