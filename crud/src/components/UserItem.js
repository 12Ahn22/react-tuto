import './UserItem.css';

// 테스트용 유저 데이터
const test = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

const UserItem = ({ user }) => {
  return (
    <div className='user'>
      <h2>name : {user.name}</h2>
      <h3>username : {user.username}</h3>
    </div>
  );
};

export default UserItem;
