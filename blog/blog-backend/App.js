const express = require('express');

// dotenv 사용
const dotenv = require('dotenv');
dotenv.config();

// 변수
const port = process.env.PORT || 4005;

// 어플리케이션 생성
const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`${port}에서 대기중`);
});
