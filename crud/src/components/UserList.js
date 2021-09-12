import { useEffect, useState } from 'react';
import UserItem from './UserItem';

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <>
      {/* <UserItem users={users} /> */}
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </>
  );
};

export default UserList;
