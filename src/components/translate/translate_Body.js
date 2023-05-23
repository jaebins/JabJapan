export default function Translate_body(props){
    return(
        <div className='translate-body'>
            <div className="translate-body-workingArea">
                <div className="translate-body-workingArea-inputArea">
                    <div className="isIcon">⌨️{props.transMode.targetLan}</div><br/>
                    <textarea id="translate-body-workingArea-inputArea-inputTarget" placeholder="일본식 발음으로 정확하게 입력해주세요."></textarea>
                    <div className="translate-body-workingArea-inputArea-check">
                        <div style={{
                                marginTop: 5,
                                marginRight: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                textAlign: "center"
                        }}>일본어 그대로 번역</div> <input type="checkbox" id="translate-body-workingArea-inputArea-checkTransOriginalWord"/>
                    </div>
                </div>

                <div id="translate-body-workingArea-changeModeBut" className="isIcon" onClick={props.changeMode}>↕</div>
                
                <div className="translate-body-workingArea-outputArea">
                    <div className="isIcon">🔍{props.transMode.resultLan}</div><br/>
                    <textarea id="translate-body-workingArea-outputArea-outputTarget" value={`${props.result.japanese_rs}(뜻 : ${props.result.korean_rs})`} readOnly={true}></textarea>
                </div>
                
                <div className="translate-body-workingArea-transArea">
                    <button id="translate-body-workingArea-translateBut" onClick={props.translate}>번역하기</button>
                </div>
            </div>
        </div>
    )
}