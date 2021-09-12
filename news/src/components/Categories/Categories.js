import React from 'react';
import styled, { css } from 'styled-components';
// 카테고리에 Nav링크 설정하기
// NavLink는 선택됬을 때, 클래스를 설정해줄 수 있다.
import { NavLink } from 'react-router-dom';

const categories = [
  {
    name: 'all',
    text: '전체보기',
  },
  {
    name: 'business',
    text: '비지니스',
  },
  {
    name: 'entertainment',
    text: '엔터테이먼트',
  },
  {
    name: 'health',
    text: '건강',
  },
  {
    name: 'science',
    text: '과학',
  },
];

// 스타일드컴포넌트
const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 780px) {
    width: 100%;
    overflow-x: auto;
  }
`;

// const Category = styled.div`
const Category = styled(NavLink)`
  // 컴포넌트 자체에 styled 적용법
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
  &:hover {
    color: #495057;
  }
  & + & {
    margin-left: 1rem;
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;
      &:hover {
        color: #3bc9db;
      }
    `}
`;

const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          // active={category === c.name}
          // onClick={() => onSelect(c.name)}
          activeClassName='active'
          // 경로가 '/'인 경우는 exact로 확실한 경로명으로 이동하게함
          exact={c.name === 'all'}
          // 클릭 시 이동되는 경로 설정
          to={c.name === 'all' ? '/' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
