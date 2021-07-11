import React, { useState } from 'react';

export default function Event() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  // 객체를 state로 사용하기
  const [form, setForm] = useState({
    username: '',
    message: '',
  });

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value);
        const nextForm = {
          ...form, // 기존의 form 내용을 복사
          [e.target.name]: e.target.value,
        };
        setForm(nextForm);
        console.log(form);
        break;
      case 'message':
        setMessage(e.target.value);

        break;
      default:
        break;
    }
    // console.log(e.target.name); // name을 알려준다
  };

  const saveUser = (e) => {};

  return (
    <div>
      <input
        type='text'
        name='username'
        value={username}
        onChange={handleChange}
      />

      <input
        type='text'
        name='message'
        value={message}
        onChange={handleChange}
      />

      <button type='button' onClick={saveUser}>
        저장
      </button>
    </div>
  );
}
