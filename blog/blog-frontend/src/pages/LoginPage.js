import React from 'react';
// 컴포넌트 참조
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type='login' />
    </AuthTemplate>
  );
};

export default LoginPage;
