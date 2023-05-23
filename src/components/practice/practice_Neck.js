import SelectMode from "./practice_SelectMode";

export default function Practice_neck(props){
    return(
        <div className="neck">
            <SelectMode type={props.isSmallScreen ? "HMode" : "Hiragana"} createQuestion={props.createQuestion}></SelectMode>
            <SelectMode type={props.isSmallScreen ? "KMode" : "Katakana"}  createQuestion={props.createQuestion}></SelectMode>
            <div className="neck-category">
                <div id="neck-category-title" onClick={() => window.location.href="/"}>{props.isSmallScreen ? "Translate" : "TranslateMode"}</div>
            </div>
        </div>
    )
}