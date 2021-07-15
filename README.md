# _리액트를 다루는 기술 공부_

> **리액트를 다루는 기술**을 읽고 공부한 내용들을 저장한 레포지토리 입니다.

리액트를 다루는 기술 책의 깃허브 레포지토리 코드와 Velopert님의 리액트 깃북을 참고하고 있습니다.

- [리액트를 다루는 기술](https://github.com/velopert/learning-react)
- [Velopert 리액트 깃 북](https://react.vlpt.us/)

### todo-app

일정 관리 REACT 어플리케이션입니다.

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

### vanilla-redux

바닐라 스크립트에 리덕스를 사용한 어플리케이션 입니다.

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

### react-redux-tuto

리덕스를 리액트에 적용해보기

#### 사용 라이브러리

- redux
- react-redux

#### 리뷰

리액트에서는 store의 내장 함수 subscribe보다는 react-redux 라이브러리를 사용한다.
