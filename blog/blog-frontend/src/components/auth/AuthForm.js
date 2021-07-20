import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

/* 
  회원 가입 또는 로그인 폼을 보여준다.
*/

// 각 컴포넌트의 최상위 컴포넌트를 감싸는 요소를 ~~~Block 혹은 Wrapper라고 한다
const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;
// 스타일링 된 input 태그
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: ${palette.cyan[7]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  /* input 태그 끼리 붙어있을 경우 margin top 주기 */
  & + & {
    margin-top: 1rem;
  }
`;
// 폼 하단에 로그인 혹은 회원 가입 링크 제공
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

// Button 컴포넌트의 상단에 margin 주기
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

// type값에 따라 사용되는 문구를 변경해주기

const AuthForm = ({ type }) => {
  const textMap = {
    login: '로그인',
    register: '회원가입',
  };
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form>
        <StyledInput
          autoComplete='username'
          name='username'
          placeholder='아이디'
        />
        <StyledInput
          autoComplete='new-password'
          name='password'
          placeholder='비밀번호'
          type='password'
        />
        {type === 'register' && (
          <StyledInput
            autoComplete='new-password'
            name='passwordConfirm'
            placeholder='비밀번호 확인'
            type='password'
          />
        )}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to='/register'>회원가입</Link>
        ) : (
          <Link to='/login'>로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
