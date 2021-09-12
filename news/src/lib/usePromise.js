// 커스텀 Hook를 만들어서 간결하게 코드 작성하기

import { useEffect, useState } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 대기 중, 완료, 실패에 대한 상태 관리
  const [loading, setLoading] = useState(true);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      try {
        const resolved = await promiseCreator(); // 프로미스 실행
        // 성공한 결과를 resolved에 저장하기
        setResolved(resolved);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    // Promise 함수 실행하기
    process();
    // deps는 의존성 배열
  }, deps);

  // 결과를 반환
  return [loading, resolved, error];
}
