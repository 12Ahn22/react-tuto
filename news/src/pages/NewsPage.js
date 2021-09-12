import Categories from '../components/Categories/Categories';
import NewsList from '../components/News/NewsList';

const NewsPage = ({ match }) => {
  // 카테고리 기본 값을 all로 설정한다.
  // 카테고리를 파라미터에서 가져온다. 이름은 category
  const category = match.params.category || 'all';

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
};

export default NewsPage;
