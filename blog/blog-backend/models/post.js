// post 테이블
/*
  필요한 속성(컬럼) 생각하기
  id - Number - 포스트의 고유 id
  title - String -  제목
  body - String - 내용
  tags - String - 태그 목록
  publishedDate - Date - 작성날짜
  uid - String - 작성자
*/

// post 테이블 생성하기

module.exports = (sequelize, DataTypes) => {
  // 자동으로 복수형테이블로 생성된다. post => posts
  return sequelize.define(
    'post',
    {
      // id는 자동으로 생성된다.
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 태그를 String으로 저장하고
      // custom getter를 이용해서, #으로 쪼개 가져오기
      tags: {
        type: DataTypes.STRING(100),
        allowNull: true,
        get() {
          return this.getDataValue('tags')
            .split('#') // #을 기준으로 자르고
            .filter((item) => item !== ''); // 빈 값은 삭제
        },
      },
    },
    {
      // Other model options go here
      timestamps: true, // timestamp가 생성시간, 업데이트 시간 컬럼을 자동 추가
      paranoid: true,
    }
  );
};
