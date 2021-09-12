import { useEffect, useState } from 'react';
import UserItem from './UserItem';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');

  const onChangeHandler = (e) => {
    setSearch(e.currentTarget.value);
  };

  // User정보를 jsonplaceholder에서 가져오기
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

  // 필터된 Users를 갱신하는 useEffect
  useEffect(() => {
    // 입력값이 변경될 경우, 다시 리렌더링을 한다.
    // 입력값으로 정규표현식을 만들어 저장한다.
    const reg = new RegExp(`^${search}`, 'gi'); // 대소문자 구분x
    // 필터하기
    const filtered = users.filter((user) => {
      return reg.test(user.name);
    });
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <>
      {/* <UserItem users={users} /> */}
      <div>
        <input
          type='text'
          placeholder='Search Name'
          onChange={onChangeHandler}
          value={search}
        />
      </div>
      {/* {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))} */}
      {filteredUsers.length !== 0 ? (
        <>
          {filteredUsers.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </>
      ) : (
        <>
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </>
      )}
    </>
  );
};

export default UserList;
