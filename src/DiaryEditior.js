import React, { useRef, useState, useEffect } from "react";

const DiaryEditor = ({ onCreate }) => {
  useEffect(() => {
    console.log("diary editor 렌더");
  });

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const authorInput = useRef();
  const contentInput = useRef();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      //   alert("작성자는 최소 1글자 이상 입력해 주세요"); alert은 트렌디하지 않음. alert대신 포커스 주기
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      //   alert("일기본문은 최소 5글자 이상 입력해 주세요");
      contentInput.current.focus();

      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");

    setState({
      //저장성공후 일기 폼 초기화
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>Today's Diary</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          placeholder="작성자"
          value={state.author}
          onChange={handleChangeState}
          type="text"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          placeholder="일기를 작성하세요."
          value={state.content}
          onChange={handleChangeState}
          type="text"
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>save</button>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor);
