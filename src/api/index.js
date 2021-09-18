import axios from "axios";


console.log("ENVIRONMENT:", process.env.NODE_ENV);
let URL;
if (process.env.NODE_ENV === "development") {
    URL = "http://localhost:5000/api/";
} else {
    URL = "https://devbook-flex525.herokuapp.com/"
};

const server = axios.create({
    baseURL: URL,
});

export default server;
