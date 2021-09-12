import { useState, useEffect } from 'react';

const Login = () => {
  // 서버가 없으므로, jsonplaceholder의 users의 데이터를 가져와서 비교
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    name: '',
    username: '',
  });

  // DB로 사용할 users배열을 첫 렌더링 시 가져오기
  useEffect(() => {
    // 비동기 처리 함수
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        ); // 서버와 통신
        const users = await response.json(); // promise로 온 응답을 다시 json 형식으로 파싱해줘야한다.
        setUsers(users);
        return;
      } catch (error) {
        console.error(error);
        return false;
      }
    };
    fetchUser();
  }, []);

  // onChangeHandler
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onClickHandler = (e) => {
    e.preventDefault(); // 브라우저 기존 기능 삭제
    // users에 입력한 user가 있는지 확인하기 - 로그인 확인
    const isOK = users.find((_user) => {
      if (_user.name === user.name && _user.username === user.username) {
        return _user;
      }
    });
    if (isOK) {
      alert('로그인 성공');
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <>
      <h2>로그인</h2>
      <form className='form'>
        <div className='form__input-box'>
          <label htmlFor='name'>name</label>
          <input
            placeholder='name'
            name='name'
            onChange={onChangeHandler}
            value={user.name}
          />
        </div>
        <div className='form__input-box'>
          <label htmlFor='username'>username</label>
          <input
            placeholder='username'
            name='username'
            value={user.username}
            onChange={onChangeHandler}
          />
        </div>
        <button
          type='submit'
          style={{ width: '100%' }}
          onClick={onClickHandler}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
