// 회원 인증을 위한 API
const express = require('express');
const router = express.Router();
// DB
const { User } = require('../../../models/index');
// 비밀번호 암호화를 위한 bcrypt
const bcrypt = require('bcrypt');
// 로그인 인증을 위한 토큰 발급
const jwt = require('jsonwebtoken');

// 인증 미들웨어
const jwtMiddleWare = require('../../jwtMiddleware');

// 회원 가입 라우터
router.post('/regist', async (req, res) => {
  // 회원 가입을 위한 데이터를 req에서 가져오기
  const { username, password } = req.body;
  // username이 이미 존재하는 지 확인하기
  try {
    const exists = await User.findOne({
      where: {
        username,
      },
    });
    if (exists) {
      // 이미 회원이 존재한다면 에러를 반환
      return res.json({
        status: 409,
        data: [],
        msg: '중복되는 계정입니다.',
      });
      // return 안해주면 아래 다 실행되서 중복인데 저장된다;
    }

    // 중복이 아니라면, 비밀번호를 암호화 한다.
    const hashpwd = await bcrypt.hash(password, 12);
    // 암호화한 비밀번호와 username을 db에 저장한다.
    const user = {
      username,
      password: hashpwd,
    };
    // 데이터베이스에 저장하기
    await User.create(user);

    res.json({
      status: 200,
      data: [],
      msg: '회원 가입 성공',
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 500,
      data: [],
      msg: '회원 가입 실패',
    });
  }
});

// 로그인 라우터
router.post('/login', async (req, res) => {
  // 로그인을 하기위해 클라이언트에서 보내진 데이터 확인
  const { username, password } = req.body;
  // 유효성 검사
  if (!username || !password) {
    return res.json({
      status: 400,
      data: [],
      msg: '아이디와 비밀번호를 입력하세요',
    });
  }

  // 계정 존재여부 확인
  try {
    // db에서 username으로 계정 찾아오기
    const user = await User.findOne({
      where: {
        username,
      },
    });
    // 계정이 없다면 에러처리
    if (!user) {
      return res.json({
        status: 400,
        data: [],
        msg: '아이디와 비밀번호를 확인해 주세요',
      });
    }

    // 계정이 있다면 비밀번호를 비교하기 bcrypt의 compare메서드사용
    const valid = await bcrypt.compare(password, user.password);

    // 비밀번호가 틀리다면
    if (!valid) {
      return res.json({
        status: 400,
        data: [],
        msg: '비밀번호를 확인해 주세요',
      });
    }

    // 로그인 성공 시, 토큰을 발급해준다.
    // jwt.sign(토큰에 넣고싶은 데이터, JWT시크릿 키, 옵션들)
    const token = jwt.sign(
      {
        username,
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3d', // 만료 기간
        issuer: 'ayo', // 발행자
      }
    );
    // 해당 토큰을 클라이언트 측에서 저장해야한다
    // [저장방법]
    // 로컬스토리지,세션스토리지 / 브라우저의 쿠키
    // 쿠키에 저장하도록 하자 - Header에 Set-Cookie에서 찾을 수 있다.
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일- 밀리초
    });

    res.json({
      status: 200,
      data: user,
      msg: '로그인 성공',
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: 500,
      data: error,
      msg: '로그인 실패',
    });
  }
});

// 로그인 상태 확인 라우터
router.get('/check', (req, res) => {
  // 토큰이 만료되기 전에 재발급 해주는 기능
  // 로그인 중인지 확인하는 방법. req.user에 데이터가 있으면 로그인 중
  const user = req.user;
  if (!user) {
    // user가 없으면 로그인 중이 아니다.
    return res.json({
      status: 401,
      data: [],
      msg: '로그인을 해주세요',
    });
  }
  res.json({
    status: 200,
    data: user,
    msg: '로그인 중 입니다',
  });
});

// 로그아웃 라우터
router.get('/logout', (req, res) => {
  // 쿠키를 지워버리면된다!
  res.cookie('access_token', '');
  return res.json({
    status: 200,
    data: [],
    msg: '로그아웃 성공',
  });
});

module.exports = router;
