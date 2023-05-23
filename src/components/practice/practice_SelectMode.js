export default function Practice_menu(props){
    return(
        <div className="neck-category">
            <div id="neck-category-title">{props.type}</div>
            <div id="neck-category-desc" onClick={() => props.createQuestion(props.type, "객관식")}>Select</div>
            <div id="neck-category-desc" onClick={() => props.createQuestion(props.type, "주관식")}>Write</div>
        </div>
    )
}
