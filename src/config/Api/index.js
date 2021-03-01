import Axios from "axios";
import { showToast } from "../Utils";


var baseUrl =
  "https://gateway.marvel.com:443/v1/public/";


Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (response) => {
    if (!response.response) return showToast("Network Error");
    return response.response;
  }
);

export default class ApiCaller {
  static Get = (endpoint = "", headers = {}, isThirdPartyApi = false) => {
    // console.log("get from api caller", baseUrl, url);
    console.log('api console: ', endpoint)
    return Axios.get(`${baseUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json", ...headers },
    })
      .then((res) => res)
      .catch((err) => err.response);
  };

}
