// 로그인 여부로 접근을 막는 미들웨어

const checkLoggedIn = (req, res, next) => {
  // 로그인 여부를 판별하는 방법
  // 전역에서 사용하는 jwtMiddleware에서 가져온 user값이 없다면
  // 로그인상태가 아니다
  if (!req.user) {
    // 로그인이 아니라면 API에 접근 금지
    return res.json({
      status: 400,
      data: [],
      msg: '로그인을 해주세요',
    });
  }

  return next();
};

module.exports = checkLoggedIn;
