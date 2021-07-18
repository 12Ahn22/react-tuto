// posts 와 관련된 API
const express = require('express');
const router = express.Router();

// DB 불러오기
const Post = require('../../../models/index').Post;

// 로그인 여부를 따지는 미들웨어
const checkLoggedIn = require('../../checkLoggedIn');

// /:id를 사용하는 라우터들이 올바른 param를 사용하는지
// 해당 id값의 포스터가 있는지 검증하는 미들웨어
const checkParamId = async (req, res, next) => {
  const id = req.params.id;
  console.log('===저는 미들웨어의 id 입니다====', id);
  // 해당 id값이 db에 존재하는지 검색
  const isData = await Post.findOne({
    where: {
      id,
      uid: req.user.userId,
    },
  });
  // id에 맞는 데이터가 없다면
  if (isData === null) {
    // findOne은 데이터를 찾지 못하면 null을 반환한다.
    const result = {
      status: 200,
      data: [],
      msg: '해당하는 id의 포스터가 존재하지 않습니다.',
    };
    return res.json(result);
  }
  // 있는 경우 계속 진행
  next();
};

// localhost:4005/posts
// 모든 posts를 가져오는 라우터
router.get('/', async (req, res) => {
  // jwt 인증 미들웨어에서 유저 정보가 넘어오나요?
  // console.log('============유저정보===========', req.user); // 넘어온다

  /* 
    마지막 페이지 계산을 위해서 총 데이터를 10개씩 잘라서 보여줄 때,
    몇 페이지가 나오는지 계산하기
  */
  // .count()로 row의 개수를 구할 수 있다.
  const postCount = await Post.count();
  // 계산한 마지막 페이지 값을 HTTP 헤더에 넣어준다.
  // res.set을 통해 커스텀 HTTP 헤더 설정해주기
  res.set('Last-Page', Math.ceil(postCount / 10));

  /* 
      페이지 네이션 구현하기!
  */
  // 페이지 수를 받아온다. 대체로 쿼리스트링으로 가져온다
  // localhost:4005/posts?page=2
  // 쿼리 스트링 값을 받아오는 방법
  // 쿼리스트링은 req.query.이름 에 담겨있다.
  const page = parseInt(req.query.page || '1', 10);

  // 유저 이름으로 검색&태그 검색 기능
  const { uid, tag } = req.query;
  // localhost:4005/posts?page=2&username=&tag=
  const query = {
    ...(uid ? { uid: uid } : {}),
    // ...(tag ? { tags: tag } : {}), // tag가 여러개면 배열로
  };

  console.log('쿼리 뭐들어가는지 테스트', query);

  // 데이터베이스에서 post 데이터 가져오기
  try {
    const postList = await Post.findAll({
      where: query,
      offset: (page - 1) * 10, // 시작부터 제외시킬 개수
      limit: 10, // limit 옵션을 사용해, 가져올 데이터량 결정 가능
      order: [['id', 'DESC']], // 큰 수, 오래된 순서로 가져오기 DESC
    });

    console.log('태그를 어떻게 가져오지', postList[0].tags);
    // 찾아온 데이터가 너무 길기 때문에 내용을 200자 아래로 줄여준다.
    // 상세 클릭 시, 모든 글을 볼 수 있게 한다.
    // findAll로 찾아온 데이터의 값은 postList[idx].컬럼명
    // console.log('가져온 데이터의 타입은 무엇인가요?', postList[0].tags); // obj
    // postList의 모든 요소들의 body 속성을 200자 아래로 줄여준다.
    // console.log('body테스트', postList[0].body[2]);

    const shortenPostList = postList.map((post) => ({
      id: post.id,
      title: post.title,
      uid: post.uid,
      tags: post.tags,
      createdAt: post.createdAt,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));

    // posts 데이터를 보낸다
    const result = {
      status: 200,
      data: shortenPostList,
      msg: '포스트 전체 조회 성공',
    };
    res.json(result);

    // 데이터베이스 조회 실패
  } catch (error) {
    console.log(error);
    const result = {
      status: 500,
      data: error,
      msg: '포스트 전체 조회 실패!',
    };
    res.json(result);
  }
});

// post를 작성하는 라우터
router.post('/', async (req, res) => {
  // 비구조화 할당 - 저장할 데이터
  const { title, body, tags } = req.body; // req.body.속성명

  // console.log('=======user=====가 있냐', req.user);

  // 실제 DB와 연결하기
  try {
    // 데이터를 DB에 저장하기
    const savedData = await Post.create({
      title,
      body,
      tags,
      uid: req.user.userId,
    });

    const result = {
      status: 200,
      data: savedData,
      msg: '포스트 등록 성공',
    };

    res.json(result);
  } catch (error) {
    // 데이터 저장 실패
    console.error(error);
    const result = {
      status: 500,
      data: error,
      msg: '포스트 등록 실패',
    };

    res.json(result);
  }
  // 성공 결과 전송
});

// 특정 포스트 조회 라우터
router.get('/:id', async (req, res) => {
  // 파라미터에서 /:id의 값을 가져온다
  const idx = req.params.id; // req.params.id 는 string

  // console.log('======id=========', id);

  // DB에서 해당 id에 맞는 post를 검색해서 가져온다
  try {
    const findData = await Post.findOne({
      where: { id: 3 },
    });
    if (findData) {
      const result = {
        status: 200,
        data: findData,
        msg: '단일 포스터 조회 성공',
      };
      return res.json(result);
    }
    // 미들웨어의 사용으로 아래와 같은 검증을 할 필요없다
    else {
      const result = {
        status: 400,
        data: [],
        msg: '해당하는 포스터가 존재하지 않습니다',
      };
      res.json(result);
    }
    // 실패 시,
  } catch (error) {
    console.log(error);
    const result = {
      status: 500,
      data: error,
      msg: '단일 포스터 조회 실패',
    };
    return res.json(result);
  }
});

// 특정 포스트 삭제하기
router.delete('/:id', checkLoggedIn, checkParamId, async (req, res) => {
  // 파라미터에서 /:id의 값을 가져온다
  const id = Number(req.params.id); // req.params.id 는 string

  // DB에서 해당 id에 맞는 post를 검색해서 가져온다
  try {
    const removedData = await Post.destroy({
      where: { id },
    });
    if (removedData > 0) {
      const result = {
        status: 200,
        data: removedData,
        msg: '단일 포스터 삭제 성공',
      };
      res.json(result);
    }
    // 실패 시,
  } catch (error) {
    console.log(error);
    const result = {
      status: 500,
      data: error,
      msg: '단일 포스터 삭제 실패',
    };
    res.json(result);
  }
});

// 포스트를 수정하는 라우터
// PUT은 데이터를 통째로 교체할 때 사용한다.
router.put('/:id', checkLoggedIn, checkParamId, async (req, res) => {
  // 파라미터에서 /:id의 값을 가져온다
  const id = Number(req.params.id); // req.params.id 는 string

  // 변경할 데이터
  const { title, body, tags } = req.body;

  // DB에서 해당 id에 맞는 post를 검색해서 가져온다
  try {
    const updatedData = await Post.update(
      {
        title,
        body,
        tags,
      },
      {
        where: { id },
      }
    );
    if (updatedData > 0) {
      const result = {
        status: 200,
        data: updatedData,
        msg: '단일 포스터 수정 성공',
      };
      res.json(result);
    }
    // 실패 시,
  } catch (error) {
    console.log(error);
    const result = {
      status: 500,
      data: error,
      msg: '단일 포스터 수정 실패',
    };
    res.json(result);
  }
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
