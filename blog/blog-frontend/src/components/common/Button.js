import React from 'react';
import styled from 'styled-components';
// 미리 정의해둔 색상
import palette from '../../lib/styles/palette';

// 다양한 곳에서 재사용할 버튼 컴포넌트를 styled-components로 정의하기
const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem; // 16px
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
`;

// 자동 완성 기능을 사용하기 위해서 Button 컴포넌트를 만들어서 내보내주기
// ...props는 Button 컴포넌트가 받아오는 모든 props를 StyledButton에 전달한다는 의미다
const Button = (props) => <StyledButton {...props} />;

export default Button;
