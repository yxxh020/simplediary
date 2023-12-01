import React, { useEffect, useState } from "react";

//자식컴포넌트
const UnmountTest = () => {
  useEffect(() => {
    console.log("mount");
    return () => {
      //unmount 시점에 실행되게 됨
      console.log("unmount");
    };
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");

  // useEffect(() => {
  //   //카운트를 증가시켜서 페이지가 리렌더링되어도 마운트는 처음에 한번만 콘솔에 찍힘
  //   console.log("Mount!👻");
  // }, []); //두번째 인자에 빈배열을 전달하게되면 콜백함수가 마운트된 시점에만 출력이된다

  // useEffect(() => {
  //   //state가 변경되는 순간을 useEffect로 제어
  //   console.log("Update!😉");
  // });

  // useEffect(() => {
  //   console.log(`count is updated : ${count}`);
  //   if (count > 5) {
  //     alert("count가 5를 넘었습니다. 1로 초기화");
  //     setCount(1);
  //   }
  // }, [count]); //dependancy array에 감지하고 싶은 값만 넣어 활용

  // useEffect(() => {
  //   console.log(`text is updated : ${text}`);
  // }, [text]);

  // unmount
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      {/* <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div> */}
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
      {/* isvisible 이 true일 경우 unmountTest 컴포넌트 렌더링함 */}
    </div>
  );
};

export default Lifecycle;
