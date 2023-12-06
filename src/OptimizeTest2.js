import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`CounterA Update - count: ${count}`);
  });
  return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
  //prop obj가 객체일때 얕은복사(값을 비교하는게 아니라 주소를 비교) 해서 값이 1로 같아도 리렌더됨.
  useEffect(() => {
    console.log(`CounterB Update - count: ${obj.count}`);
  });

  return <div>{obj.count}</div>;
};

//React.memo의 비교함수
const areEqual = (prevprops, nextProps) => {
  //   //깊은복사로 값 비교
  //   if (prevprops.obj.count === nextProps.obj.count) {
  //     return true; //이전 props와 현재 props값이 같다 -> 리렌더링 안함 
  //   }
  //   return false;
  return prevprops.obj.count === nextProps.obj.count;
};

const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest2 = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({ count: 1 });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest2;
