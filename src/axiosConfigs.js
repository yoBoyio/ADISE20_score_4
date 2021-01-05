import axios from 'axios';

export const  api = axios.create({
    baseURL:`https://adise-score4.herokuapp.com/`
  });