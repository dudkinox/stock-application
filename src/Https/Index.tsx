import axios from "axios";

const Https = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    "Content-type": "application/json",
  },
});

export default Https;
