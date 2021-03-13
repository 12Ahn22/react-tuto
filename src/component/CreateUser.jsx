import React, { useCallback, useContext, useRef } from 'react';
import { UserDispatch } from '../App';
import useInputs from './useInputs';

const CreateUser = () => {
  // app.js가 아닌 여기서 useInputs을 가져와서 사용하기
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: '',
  });
  const idRef = useRef(4);
  // dispatch 가져오기. state를 변경하는 dispatch이다.
  const dispatch = useContext(UserDispatch);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: idRef.current,
        username,
        email,
      },
    });
    idRef.current += 1;
    reset();
  }, [dispatch, username, email, reset]);

  return (
    <div>
      <input
        type="text"
        placeholder="id"
        name="username"
        onChange={onChange}
        value={username}
        // value="아이디고정"
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        onChange={onChange}
        value={email}
      />
      <textarea
        name="comment"
        id="commnet"
        cols="30"
        rows="10"
        value="xxxx"
      ></textarea>
      <button type="button" onClick={onCreate}>
        등록
      </button>
    </div>
  );
};

export default React.memo(CreateUser);
// export default CreateUser;
