import React from 'react';

import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
// 컨테이너
import RegisterForm from '../containers/auth/RegistForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
