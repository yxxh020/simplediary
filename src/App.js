import "./App.css";
import DiaryEditor from "./DiaryEditior";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "작성자",
    content: "hi 1",
    emotion: 5,
    created_date: new Date().getTime(),
  },

  {
    id: 2,
    author: "홍길동",
    content: "hi 2",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "쿼카",
    content: "hi 3",
    emotion: 1,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList />
    </div>
  );
}

export default App;
