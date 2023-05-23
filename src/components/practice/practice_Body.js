export default function Practice_body(props){
  return(
    <div className="practice-body">
        {props.isStart
        ?
        <div className="practice-body-main">
          <div id="practice-body-main-question">{props.answelInfor.question}</div>
          <div className="practice-body-main-user">
            {props.answelInfor.mode === "객관식" 
            ? 
            <div className="practice-body-main-user-option">
              <button className="practice-body-main-user-option-answel" id="practice-body-main-user-option-answel1" onClick={() => props.selectOption(0)}>{props.options[0]}</button>
              <button className="practice-body-main-user-option-answel" id="practice-body-main-user-option-answel2" onClick={() => props.selectOption(1)}>{props.options[1]}</button>
              <button className="practice-body-main-user-option-answel" id="practice-body-main-user-option-answel3" onClick={() => props.selectOption(2)}>{props.options[2]}</button>
            </div>
            :
            <div className="practice-body-main-user-write">
              <input type="text" id="practice-body-main-user-write-input" onKeyDown={() => props.inputAnswel()} placeholder="정답을 입력하시면 Enter를 눌러주세요."></input>
            </div>
            }
          </div>

        </div>
        :
        <div id="practice-body-title">위 메뉴에서 원하는 것을 골라 시작해주세요.</div>
      }
    </div>
  )
}