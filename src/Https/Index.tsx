import axios from "axios";

const Https = axios.create({
  baseURL: `${process.env.ENDPOINT_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

export default Https;
