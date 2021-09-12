import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
// API KEY
import { API_KEY } from '../../config';
// 내가 만든 커스텀 훅스 가져오기
import usePromise from '../../lib/usePromise';

// styled
const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;

// useEffect를 사용해 첫 로딩 시 데이터 호출
const NewsList = ({ category }) => {
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);
  // 커스텀 훅스 사용하기 - 프로미스를 실행하는 커스텀 훅스
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    const URL = `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`;
    return axios.get(URL);
  }, [category]);

  // useEffect(() => {
  //   // 데이터를 가져오는 함수 선언
  //   const fetchData = async () => {
  //     try {
  //       const query = category === 'all' ? '' : `&category=${category}`;
  //       const URL = `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`;

  //       const response = await axios.get(URL);
  //       setArticles(response.data.articles);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   // 첫 로딩 시, 함수 실행
  //   fetchData();
  // }, [category]);

  // 삼항 연산자가 아닌 위에서 if문으로 로딩중 화면 보여주기
  if (loading) {
    return <NewsListBlock>로딩 중...</NewsListBlock>;
  }
  // article이 없을 경우 null 리턴
  // 체크를 꼭 해줘야한다. 안그러면 렌더링 오류 발생
  // if (!articles) {
  if (!response) {
    return null;
  }
  // 에러가 있는 경우
  if (error) {
    return <NewsListBlock>에러 발생</NewsListBlock>;
  }

  const articles = response.data.articles;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem article={article} key={article.url} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
