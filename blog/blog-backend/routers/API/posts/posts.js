// posts 와 관련된 API
const express = require('express');
const router = express.Router();

// 임의 데이터
let postId = 2; // id의 초기값
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
  {
    id: 2,
    title: '2번',
    body: '2번 내용',
  },
]; // posts 배열 초기값

// localhost:4005/posts
// 모든 posts를 가져오는 라우터
router.get('/', (req, res) => {
  // posts 데이터를 보낸다
  const result = {
    status: 200,
    data: posts,
    msg: '포스트 전체 조회 성공',
  };
  res.json(result);
});

// post를 작성하는 라우터
router.post('/', (req, res) => {
  // 비구조화 할당
  const { title, body } = req.body; // req.body.속성명
  postId += 1; // id 증가
  // 저장할 post 데이터
  const post = { id: postId, title, body };
  // posts 배열에 저장
  posts.push(post);

  // 성공 결과 전송
  const result = {
    status: 200,
    data: posts,
    msg: '포스트 등록 성공',
  };
  res.json(result);
});

// 특정 포스트 조회 라우터
router.get('/:id', (req, res) => {
  // 파라미터에서 /:id의 값을 가져온다
  const id = Number(req.params.id); // req.params.id 는 string
  // 해당 아이디에 맞는 posts를 가져온다
  const post = posts.find((post) => post.id === id); // id는 Number
  if (post === undefined) {
    // find는 값이 없을 경우 undefined를 반환
    const result = {
      status: 400,
      data: [],
      msg: '해당 포스트는 존재하지 않습니다',
    };
    res.json(result);
  }
  const result = {
    status: 200,
    data: post,
    msg: '포스트 조회 성공',
  };
  res.json(result);
});

// 특정 포스트 삭제하기
router.delete('/:id', (req, res) => {
  // 파라미터에서 /:id의 값을 가져온다
  const id = Number(req.params.id); // req.params.id 는 string

  // 해당 id값을 가진 post를 삭제한다.
  const removeIdx = posts.findIndex((posts) => post.id === id); // 삭제할 idx
  posts.splice(removeIdx, 1); // splice는 기존 배열을 변경시킨다.

  const result = {
    status: 200,
    data: posts,
    msg: '포스트 삭제 성공',
  };
  res.json(result);
});

// 포스트를 수정하는 라우터
// PUT은 데이터를 통째로 교체할 때 사용한다.
router.put('/:id', (req, res) => {
  // 파라미터에서 /:id의 값을 가져온다
  const id = Number(req.params.id); // req.params.id 는 string

  // 수정할 데이터를 가져온다
  const { title, body } = req.body;

  // 데이터를 교체할 인덱스를 가져온다
  const replaceIdx = posts.findIndex((posts) => post.id === id); // 삭제할 idx
  posts[replaceIdx] = {
    id,
    title,
    body,
  };

  const result = {
    status: 200,
    data: posts,
    msg: '포스트 수정 성공',
  };

  res.json(result);
});

// 데이터 전체가 아닌 특정 데이터만 교체하는 경우 사용한다.
// PUT과 유사하다.
router.patch('/:id', (req, res) => {
  // 파라미터에서 /:id의 값을 가져온다
  const id = Number(req.params.id); // req.params.id 는 string

  // 수정할 데이터를 가져온다
  const { title, body } = req.body;

  // 데이터를 교체할 인덱스를 가져온다
  const replaceIdx = posts.findIndex((posts) => post.id === id); // 삭제할 idx
  posts[replaceIdx] = {
    id,
    title,
    body,
  };

  const result = {
    status: 200,
    data: posts,
    msg: '포스트 수정 성공',
  };

  res.json(result);
});

module.exports = router;
