const path = require('path');
// sequelize
const Sequelize = require('sequelize');

// 개발 환경 설정
const env = process.env.NODE_ENV || 'development';
// 데이터베이스 연결 환경 설정 - config.json에는 db에 관한 설정값들이 존재
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[
  env
];

// 데이터베이스 객체
const db = {}; // 여기에 실제 데이터베이스가 연결된다.

// 가져온 설정으로 시퀄라이즈 객체를 생성한다
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db와 ORM을 매핑한다
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 만든 테이블을 db에 연결하기
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

// 관계 설정해주기
// 유저는 많은 포스트를 가질 수 있다. 1:N
db.User.hasMany(db.Post);
// 포스트는 유저에 속해있다
db.Post.belongsTo(db.User);
// 포스트는 많은 해시태그에 속해 있다.
db.Post.belongsToMany(db.Hashtag, {
  through: 'PostHashTag',
});
// 해시태그는 많은 포스트에 속해 있다
db.Hashtag.belongsToMany(db.Post, {
  through: 'PostHashTag',
});

// 모듈 내보내기
module.exports = db;
