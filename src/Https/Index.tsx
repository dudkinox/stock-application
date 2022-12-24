import axios from "axios";

const Https = axios.create({
  baseURL: "https://stock.insurance-panyaintra.com",
  // baseURL: `${process.env.ENDPOINT_URL}`,
  headers: {
    "Content-type": "application/json",
  },
});

export default Https;
