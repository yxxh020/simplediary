import "./App.css";
import DiaryEditor from "./DiaryEditior";
import DiaryList from "./DiaryList";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import Lifecycle from "./Lifecycle";
import OptimizeTest2 from "./OptimizeTest2";

// domain: https://jsonplaceholder.typicode.com/comments

//context api
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  //action 객체의 type을 통해서 상태변화 처리
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

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

    dispatch({ type: "INIT", data: initData });
    // setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    //useCallback:첫번째 콜백인자가 데이터를 추가하고 두번째 [] 빈배열을 전달해서 마운트할때만 생성되고 재사용되도록

    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
    // setData((data) => [newItem, ...data]); // 인자로 데이터를 받아서 새 아이템을 추가한 데이터를 리턴하는 함수전달
  }, []);

  //삭제
  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  //수정함수 diaryitem에 prop으로
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

  //oncreate, onremove, onedit 하나로 묶어서 context provider로 전달
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

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
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/* <Lifecycle /> */}
          {/* <OptimizeTest2 /> */}
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div> 
          <div>기분 좋은 일기 개수: {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
