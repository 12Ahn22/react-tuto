// CSS
import { useState } from 'react';
import '../libs/Regist.css';

const Regist = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    username: '',
  });

  // onChangeHandler
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };
  const onClickHandler = async (e) => {
    e.preventDefault();
    // 현재 백엔드가 없으므로 임의로 id값 설정해주기
    setUser({ ...user, id: '11' });
    // jsonplaceholder에 데이터 저장 요청 보내기
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
          method: 'POST',
          body: JSON.stringify(user), // 보내는 데이터는 json이 아닌 string으로 변환해서 전송
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      const result = await response.json(); // Promise를 json으로 파싱해준다.
      console.log('저장 완료', result);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <>
      <h2>회원가입</h2>
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
          Create
        </button>
      </form>
    </>
  );
};

export default Regist;
