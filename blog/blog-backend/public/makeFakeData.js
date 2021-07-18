// 페이크 데이터를 만드는 스크립트

const Post = require('../models').Post;

const createFakeData = () => {
  const posts = [...Array(30).keys()].map((i) => ({
    title: `포스트 #${i}`,
    body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exactThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact1.10.32 and`,
    tags: '#테스트#입#니다',
    uid: '2',
  }));

  posts.forEach(async (post) => {
    await Post.create({
      title: post.title,
      body: post.body,
      tags: post.tags,
      uid: post.uid,
    });

    console.log('done');
  });
};

createFakeData();
