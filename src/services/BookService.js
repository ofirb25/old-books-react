import axios from 'axios';

function getBooks() {
   return axios.get(`data/books.json`)
    .then(({ data }) => data)
};

export default {
    getBooks
}