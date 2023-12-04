import React, { useState, useEffect } from "react";

const Textview = React.memo(({ text }) => {
  //React.memo 사용해서 props의 값이 바뀌지 않으면 부모컴포넌트가 리렌더 되더라도 자식컴포넌트는 리렌더 안되게
  useEffect(() => {
    console.log(`update :: text : ${text}`);
  });
  return <div>{text}</div>;
});

const Countview = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`update :: count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");
  
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <Countview count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OptimizeTest;
