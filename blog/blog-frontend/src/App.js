import './App.css';

// 컴포넌트 참조
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* path에 배열을 추가해, 여러 경로를 한방에 작성 가능 */}
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path={'/login'} />
      <Route component={RegisterPage} path={'/register'} />
      <Route component={WritePage} path={'/write'} />
      <Route component={PostPage} path={'/@:username/:postId'} />
    </>
  );
}

export default App;
