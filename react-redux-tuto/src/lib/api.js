// api를 부르는 코드들을 함수화 해서 관리한다
import axios from 'axios';

export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);
