import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// 액션 생성 함수
import auth, {
  changeFiled,
  initializeForm,
  authResult,
} from '../../modules/auth';
// 컴포넌트
import AuthForm from '../../components/auth/AuthForm';

// auth를 위한 axios
import { register } from '../../lib/api/client';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // const test = useSelector((test) => test);
  const { form, auth } = useSelector(({ auth }) => ({ form: auth.register }));

  console.log('test', form, auth);
  // console.log('test', test);

  // input 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    // form, key, value
    dispatch(changeFiled('register', name, value)); // changeFiled 액션 생성 함수로 dispatch
  };

  // form 등록 이벤트 핸들러
  const onSubmit = async (e) => {
    console.log('회원가입을 시작합니다.');
    e.preventDefault();

    const { username, password, passwordConfirm } = form;
    // 유효성 검사
    if (!username || !password) {
      alert('정보를 입력해주세요!');
      return;
    }

    if (password !== passwordConfirm) {
      // TODO: 오류 처리하기
      return;
    }

    // 회원 가입 진행하기
    try {
      const result = await register({ username, password });
      console.log(result);
      dispatch(authResult(result.data.msg, result.data.data));
    } catch (error) {
      console.log(error);
      alert('회원가입 실패');
      dispatch(authResult(error.data.msg, error.data.data));
      history.push('/register');
    }

    console.log();
  };

  // 컴포넌트가 처음 렌더링 될 대, form을 초기화
  useEffect(() => {
    console.log('form을 초기화 합니다');
    dispatch(initializeForm('register'));
  }, [dispatch]);
  return (
    <AuthForm
      type='register'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
