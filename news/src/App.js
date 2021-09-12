import { useCallback, useState } from 'react';
import './App.css';
import Categories from './components/Categories/Categories';
import NewsList from './components/News/NewsList';
// 라우터
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

function App() {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      {/* <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} /> */}

      {/* 리액트 라우터를 사용해 카테고리 구분하기 */}
      {/* /:파라미터, 뒤에 ?가 붙은 경우는 있을 수도있고 없을 수도 있다는 의미 */}
      <Route path='/:category?' component={NewsPage} />
    </>
  );
}

export default App;
