// 회원 인증을 위한 API
const express = require('express');
const router = express.Router();
// DB
const { User } = require('../../../models/index');
// 비밀번호 암호화를 위한 bcrypt
const bcrypt = require('bcrypt');

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
router.get('/check', (req, res) => {});
// 로그아웃 라우터
router.post('/logout', (req, res) => {});

module.exports = router;
