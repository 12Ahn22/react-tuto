// 유저 테이블
module.exports = (sequelize, DataTypes) => {
  // 자동으로 복수형테이블로 생성된다. post => posts
  return sequelize.define(
    'user',
    {
      // id는 자동으로 생성된다.
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      // Other model options go here
      timestamps: true, // timestamp가 생성시간, 업데이트 시간 컬럼을 자동 추가
      paranoid: true,
    }
  );
};
