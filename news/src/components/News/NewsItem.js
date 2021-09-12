import React from 'react';
import styled from 'styled-components';

// styled
const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

// 기사를 받아서 표현하는 컴포넌트
const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;
  return (
    <NewsItemBlock>
      {urlToImage && (
        <div className='thumbnail'>
          {/* target을 _blank 새창열기로 하는 경우 보안상 이슈가 발생하기 때문에
            noopener 과 noreferrer을 사용해준다.
          */}
          <a href={url} target='_blank' rel='noopener noreferrer'>
            <img src={urlToImage} atl='thumbnail' />
          </a>
        </div>
      )}
      <div className='contents'>
        <h2>
          <a href={url} target='_blank' rel='noopener noreferrer'>
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;
