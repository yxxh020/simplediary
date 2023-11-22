import "./App.css";
import DiaryEditor from "./DiaryEditior";
import DiaryList from "./DiaryList";
import { useRef, useState } from "react";
import Lifecycle from "./Lifecycle";

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

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  //삭제
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    console.log(newDiaryList);
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

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
