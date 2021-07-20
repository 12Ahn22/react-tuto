const express = require('express');
// dotenv 사용
const dotenv = require('dotenv');
dotenv.config();
// path 내장 모듈 사용
const path = require('path');
// 데이터베이스 참조
const { sequelize } = require('./models/index');
// 토큰 인증 미들웨어
const jwtMiddleWare = require('./routers/jwtMiddleware');
// 쿠키 파서
const cookieParser = require('cookie-parser');
// 변수
const port = process.env.PORT || 4005;

// 어플리케이션 생성
const app = express();

// 필수 사용 미들웨어
app.use(express.urlencoded({ extended: false })); // url 해석 기능 추가
app.use(express.json()); // json 해석 기능 추가
app.use(express.static(path.join(__dirname, 'public')));
// 쿠키 파서
app.use(cookieParser()); // 쿠키를 사용하려면 꼭 쿠키 파서 미들웨어를 사용하자.

// 인증 미들웨어는 라우터보다 먼저 사용하기
app.use(jwtMiddleWare); // 토큰을 계속 검증하는 라우터

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

// 에러 처리 라우터
app.use((err, req, res, next) => {
  console.error(err);
  err.status = 500;
  res.render('에러 처리 라우터입니다.', err);
});

app.listen(port, () => {
  console.log(`${port}에서 대기중`);
});
