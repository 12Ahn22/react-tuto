const jwt = require('jsonwebtoken');
const { User } = require('../models');

// 토큰을 검증하고 해당 데이터를 가져오는 미들웨어다.
// 그래서 전역에서 app.use(jwtMiddleWare)을 해주는 것이다
// 로그인 여부는 따로 로그인 여부 미들웨어를 만들어서 사용한다!

// 토큰 검증을 위한 미들웨어
const jwtMiddleWare = async (req, res, next) => {
  // console.log('============쿠키확인=================', req.cookies);
  const token = req.cookies['access_token'];
  // 토큰이 없다면 에러 처리 라우터로 보내버리기
  if (!token) {
    return next();
    // return res.json({
    //   status: 400,
    //   data: [],
    //   msg: '먼저 로그인을 해주세요!',
    // });
  }

  try {
    // 토큰이 있다면 해당 토큰이 정상적인 토큰인지 검증하기
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('쿠키를 해석한 결과', decoded);
    // 토큰을 해석한 결과를 req에 넣어서 다음 미들웨어&라우터에게 전송
    req.user = {
      username: decoded.username,
      userId: decoded.id,
      exp: decoded.exp,
    };

    /*
  토큰을 해석한 결과 {
  ...
  iat: 1626616352,
  exp: 1626789152, // 만료되는지 알려주는 값.. 3.5일 미만이면 재발급해주자
  }
  */

    // 토큰 재발급 해주기
    const now = Math.floor(Date.now() / 1000); // 현재 시간
    try {
      // 3.5일보다 적게 유효기간이 남았다면
      if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
        const user = await User.findOne({
          where: {
            username: decoded.username,
          },
        });
        const token = jwt.sign(
          {
            username: user.username,
            id: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d', // 만료 기간
            issuer: 'ayo', // 발행자
          }
        );
        // 쿠키에 토큰 다시 세팅해주기
        res.cookie('access_token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7일- 밀리초
        });
      }
    } catch (error) {
      // 토큰 재발급 실패
      console.error(error);
      return next(error);
    }
    return next();
  } catch (error) {
    // 토큰이 유효하지 않는 경우
    console.error(error);
    return res.json({
      status: 400,
      data: [],
      msg: '유효하지 않는 토큰입니다.',
    });
  }
};

module.exports = jwtMiddleWare;
