// 백엔드 API 연결을 위한 파일
import axios from 'axios';
// axios 인스턴스를 만들어서 따로 관리한다

const client = axios.create();
// 글로벌 설정해주기
client.defaults.baseURL = 'http://localhost:4005';

// 로그인
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

// 회원가입
export const register = ({ username, password }) =>
  client.post('/api/auth/register', {
    username,
    password,
  });

// 로그인 상태 체크
export const check = () => client.get('/api/auth/check');

export default client;
