const express = require('express');
// dotenv 사용
const dotenv = require('dotenv');
dotenv.config();
// path 내장 모듈 사용
const path = require('path');

// 변수
const port = process.env.PORT || 4005;

// 어플리케이션 생성
const app = express();

// 필수 사용 미들웨어
app.use(express.urlencoded({ extended: false })); // url 해석 기능 추가
app.use(express.json()); // json 해석 기능 추가
app.use(express.static(path.join(__dirname, 'public')));

// 미들웨어
app.use((req, res, next) => {
  console.log(req.url);
  console.log(1);
  next();
});

app.use((req, res, next) => {
  console.log(2);
  next();
});

// 라우터 참조
const postRouter = require('./routers/API/posts/posts');

// 라우터들
app.use('/posts', postRouter); // posts 라우터

// 기본 라우터
app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`${port}에서 대기중`);
});
