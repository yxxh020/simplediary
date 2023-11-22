import React, { useEffect, useState } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    //카운트를 증가시켜서 페이지가 리렌더링되어도 마운트는 처음에 한번만 콘솔에 찍힘
    console.log("Mounting!👻");
  }, []); //두번째 인자에 빈배열을 전달하게되면 콜백함수가 마운트된 시점에만 출력이된다

  useEffect(() => { //state가 변경되는 순간을 useEffect로 제어
    console.log("Update!😉");
  });

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
