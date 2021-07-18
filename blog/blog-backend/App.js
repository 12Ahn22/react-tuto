const express = require('express');
// dotenv 사용
const dotenv = require('dotenv');
dotenv.config();
// path 내장 모듈 사용
const path = require('path');
// 데이터베이스 참조
const { sequelize } = require('./models/index');

// 변수
const port = process.env.PORT || 4005;

// 어플리케이션 생성
const app = express();

// 필수 사용 미들웨어
app.use(express.urlencoded({ extended: false })); // url 해석 기능 추가
app.use(express.json()); // json 해석 기능 추가
app.use(express.static(path.join(__dirname, 'public')));

// 데이터베이스 연결하기
sequelize
  .sync({ force: false }) // true라면 매번 새 테이블 생성
  .then(() => {
    console.log('데이터베이스 연동 성공');
  })
  .catch((err) => {
    console.log('데이터베이스 연동 실패!');
    console.error(err);
  });

// 라우터 참조
const postRouter = require('./routers/API/posts/posts');
const authRouter = require('./routers/API/auth/auth');

// 라우터들
app.use('/api/posts', postRouter); // posts 라우터
app.use('/api/auth', authRouter); // auth 라우터

// 기본 라우터
app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`${port}에서 대기중`);
});