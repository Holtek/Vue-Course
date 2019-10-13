import axios from "axios";

const instance = axios.create({
  baseURL: "https://vue-update-f294c.firebaseio.com"
});

instance.defaults.headers.common["somethingheader"] = "something";

export default instance;
