export default function Translate_Neck(props){
    return(
        <div className="neck">
            <div className="neck-category">
                <div id="neck-category-title" onClick={() => window.location.href="/practice"}>{props.isSmallScreen ? "Practice" : "PracticeMode"}</div>
            </div>
            <div className="neck-category">
                <div id="neck-category-title" onClick={() => window.location.href="/saveWordMap"}>WordMap</div>
            </div>
        </div>
    )
}