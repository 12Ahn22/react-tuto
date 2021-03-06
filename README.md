# _리액트를 다루는 기술 공부_

> **리액트를 다루는 기술**을 읽고 공부한 내용들을 저장한 레포지토리 입니다.

리액트를 다루는 기술 책의 깃허브 레포지토리 코드와 Velopert님의 리액트 깃북을 참고하고 있습니다.

- [리액트를 다루는 기술](https://github.com/velopert/learning-react)
- [Velopert 리액트 깃 북](https://react.vlpt.us/)

### 🔮 todo-app

> 일정 관리 REACT 어플리케이션입니다.

#### 사용 라이브러리

- node-sass
- classnames
- react-icons

#### 리뷰

기본적인 CRUD 기능에 대한 이해
불변성을 지키면서 데이터를 추가하고 삭제하기

##### <span style='color:red;'>불변성</span>을 지켜야하는 이유

불변성을 지키지 않고 상태를 업데이트하면 상태가 변화했는지 정확하게 리액트가 감지할 수 없다.
리액트는 `얕은 복사`로 상태가 변했는지 검사하기 때문이다.

```javascript
{} == {} // false
obj = {name:'ayo'};
obj2 = obj;
obj == obj2; // true
obj.name = 'ayo2'; // obj의 name을 변경하더라도
obj == obj2; // true, obj와 obj2는 같다.
// 둘은 값 자체를 저장하고 있는 것이 아닌
// 참조 주소를 저장하고 있다.
// 따라서 새로운 객체를 만들어 새로운 참조 주소를
// 할당하는 것이 아니라면 둘은 계속 같다.
obj = {name:'ayo2'}; // 아예 새로운 객체 {}를 할당
obj == obj2; // false
```

<br/>

### 🔮 vanilla-redux

> 바닐라 스크립트에 리덕스를 사용한 어플리케이션 입니다.

#### 사용 라이브러리

- parcel-bundler
- redux

#### 리뷰

기본적인 리덕스를 사용해보기
리덕스는 리액트에 종속되는 라이브러리가 아니다.

##### 리덕스 사용 순서

1. 액션 타입과 액션 생성 함수 만들기
2. 상태의 초기값 설정하기
3. 리듀서 함수 정의하기
4. 스토어 만들기
5. 렌더 함수 만들기
6. 구독하기
7. 액션 발생시키기
   <br/>

### 🔮 react-redux-tuto

> 리덕스를 리액트에 적용해보기
> 다양한 리덕스 라이브러리들 사용해보기

#### 사용 라이브러리

- redux
- [react-redux](https://react-redux.js.org/)
- [redux-actions](https://github.com/redux-utilities/redux-actions)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)

#### 리뷰

리액트에서는 store의 내장 함수 subscribe보다는 react-redux 라이브러리를 사용한다.
리덕스 액션을 통해 액션 객체 생성 함수를 간단한 코드로 작성할 수 있다.
리덕스 미들웨어는 액션과 리듀서 사이의 중간역할을 한다.

#### 미들웨어의 기본 구조

```js
const 미들웨어 = (store) => (next) => (action) => {
  // 미들웨어
};
```

노드 express의 미들웨어와 유사하다. 내부에 next(action)을 사용해야 다음 미들웨어, 리듀서로 흐름이 이동할 수 있다.

#### redux-thunk

비동기 작업을 위한 리덕스 미들웨어
객체가 아닌 **함수 형태의 액션**을 디스패치 할 수 있게 한다.

### 🔮 splitting-sample

> 간단한 코드 스플리팅 해보기

#### 코드 스플리팅이란?

하나의 큰 번들을 여러개의 작은 번들들로 쪼개주는 작업
코드 스플리팅을 통해 필요할 때, 필요한 번들만 로드함으로써 초기 로딩시간을 줄여주고, 현재 필요하지 않은 코드는 로드하지 않음으로써 어플리케이션의 성능을 크게 향상 시킬수 있다.

#### 리뷰

코드 스플리팅이 무엇인지 알아보기
<br/>

### 🔮 blog

> 책 예제를 참고해 만든 블로그 웹 사이트
> 책에서는 koa를 사용하지만 express를 이용해 백엔드를 구축
> mongoDB가 아닌 MySQL를 데이터베이스로 사용 + sequelize

#### 사용라이브러리

- dotenv

**백엔드**

- express
- sequelize
- sequelize-cli
- mysql
- bcrypt
- jsonwebtoken
- cors

**프론트엔드**

- react-router-dom
- styled-components
- redux / react-redux / redux-devtools-extension
- axios

### 🔮 news

> 비동기 처리란?
> 커스텀 훅스와 스타일드 컴포넌트 사용해보기

#### 사용 라이브러리

- react-router
- axios
- styled-components

#### 자바스크립트의 비동기

- **비동기란?**

  어떤 작업을 요청하고 그 작업이 끝날 때 까지 기다리지않고, 다른 작업을 진행할 수 있는 처리방식을 말한다.

  요청의 결과를 기다릴 필요가 없다.

  자바스크립트는 비동기 처리를 위해 `콜백 함수`를 사용한다.

- **콜백 함수**

  콜백 함수를 사용해 비동기 작업을 하면 콜백 지옥에 빠지는 문제가 발생한다.

- **Promise**

  콜백 지옥을 해결하기 위해 `ES6`에 등장한 비동기 문법이다.

  프로미스는 비동기 처리가 성공(fullfiled)했는 지, 실패(rejected)했는 지에 따른 상태 정보를 가진다.

  성공 상황은 resolved 함수가 호출된 상태이고 실패 상황은 rejected 함수가 호출 된 상황이다.

  - 장점

    - 콜백 지옥 해결
    - Promise.all 을 사용해 병렬 비동기 코드를 쉽게 작성 가능
    - 콜백을 너무 빠르고 느리게 호출하지 않음

  - 단점
    - ES6를 지원하지 않는 브라우저의 경우 polyfill을 해줘야한다.
    - 코드가 복잡해진다.(물론, 기존 콜백보다는 가독성 좋음)

- **async / await**

  Promise를 좀 더 쉽게 사용하기 위해 등장한 ES8문법

  Promise를 마치 동기적으로 사용하는 것 처럼 코드를 작성할 수 있다.

  예외 처리는 trycatch문을 사용한다.

#### axios

- 가장 많이 사용되는 자바스크립트 HTTP 클라이언트
- HTTP 요청을 Promise 기반으로 처리해주는 라이브러리이다.

#### 리액트 라우터

- `match`
  - 라우터의 경로와 URL에 관한 정보를 가지고 있다.
  - `match.params`를 사용해 파라미터값을 가져올 수 있다.
- `location`
  - 현재 페이지 정보를 가지고 있다.
- `history`
  - 브라우저의 history 객체와 비슷하다. stack에 지금까지 이동한 url 경로들이 들어있다.

### 🔮 crud

> jsonplaceholder를 사용해서 간단한 crud 만들어보기

> 리액트 연습

![완성 gif 이미지](readmeData/crud20210912_210651.gif)

- `filter`를 사용해 검색기능
- `fetch API` 사용해보기
- `정규표현식` 사용하기
