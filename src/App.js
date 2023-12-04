import "./App.css";
import DiaryEditor from "./DiaryEditior";
import DiaryList from "./DiaryList";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lifecycle from "./Lifecycle";
import OptimizeTest2 from "./OptimizeTest2";

// domain: https://jsonplaceholder.typicode.com/comments

// const dummyList = [
//   {
//     id: 1,
//     author: "작성자",
//     content: "hi 1",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },

//   {
//     id: 2,
//     author: "홍길동",
//     content: "hi 2",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "쿼카",
//     content: "hi 3",
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    //promise를 반환하는 비동기 함수
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    // console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, // 1-5 랜덤 숫자
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    //useCallback:첫번째 콜백인자가 데이터를 추가하고 두번째 [] 빈배열을 전달해서 마운트할때만 생성되고 재사용되도록
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]); // 인자로 데이터를 받아서 새 아이템을 추가한 데이터를 리턴하는 함수전달
  }, []);

  //삭제
  const onRemove = (targetId) => {
    // console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    // console.log(newDiaryList);
    setData(newDiaryList);
  };

  //수정함수 diaryitem에 prop으로 전달
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  //기분 분석 함수
  const getDiaryAnalysis = useMemo(() => {
    // console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //useMemo를 쓰면 함수가 아니라 값을 리턴해줌

  return (
    <div className="App">
      {/* <Lifecycle /> */}
      {/* <OptimizeTest2 /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
