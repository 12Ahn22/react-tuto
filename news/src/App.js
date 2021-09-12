import { useCallback, useState } from 'react';
import './App.css';
import Categories from './components/Categories/Categories';
import NewsList from './components/News/NewsList';

function App() {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </>
  );
}

export default App;
