import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// 액션 생성 함수
import auth, { changeFiled, initializeForm } from '../../modules/auth';
// 컴포넌트
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = () => {
  const dispatch = useDispatch();

  const test = useSelector((test) => test);
  const { form } = useSelector(({ auth }) => ({ form: auth.login }));

  // console.log('test', form);
  // console.log('test', test);

  // input 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    // form, key, value
    dispatch(changeFiled('login', name, value)); // changeFiled 액션 생성 함수로 dispatch
  };

  // form 등록 이벤트 핸들러
  const onSubmit = (e) => {
    console.log('로그인을 시작합니다.');
    e.preventDefault();
  };

  // 컴포넌트가 처음 렌더링 될 대, form을 초기화
  useEffect(() => {
    console.log('form을 초기화 합니다');
    dispatch(initializeForm('login'));
  }, [dispatch]);
  return (
    <AuthForm
      type='login'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
