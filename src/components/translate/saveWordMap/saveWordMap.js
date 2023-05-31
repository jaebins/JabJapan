import "./saveWordMap.css"
import Head from "../../head"
import Cookies from "react-cookies"
import { useEffect, useState } from "react"

const pagePerWords = 7;

export default function SaveWordMap(){
    const[result, setResult] = useState([]);
    const[rsCounter, setRsCounter] = useState(0);
    const[page, setPage] = useState(0);

    useEffect(() => {
        let cookies = Cookies.loadAll();
        setRsCounter(Number(Cookies.load("rsCounter")) + 1);
        let tempResultArr = []
        console.log(cookies)

        if(Object.keys(cookies).length > 0 && !isNaN(rsCounter)){
            for(let i = 1; i < Object.keys(cookies).length; i++){
                let jsonObj = JSON.parse(cookies["rs" + i]);
                tempResultArr.push(jsonObj);
            }
        }

        setResult(tempResultArr);
    }, [])
    
    const changePage = (addPage) => {
        if(addPage > 0 && (page + 1) * pagePerWords < rsCounter){
            setPage(page + addPage);
        }
        else if(addPage < 0 && page > 0){
            setPage(page + addPage);
        }
    }

    const removeAllRecord = () => {
        for(let i = 0; i < rsCounter + 1; i++){
            Cookies.remove("rs" + i);
        }
        Cookies.remove("rsCounter");
        alert("기록이 지워졌습니다.");
        setResult([]);
    }

    return(
        <div className="SaveWordMap">
            <Head title={"TranslateMode"} link="/"></Head>
            <div className="saveWordMap-body">
                <table>
                    <thead>
                        <tr>
                            <th>일본어</th>
                            <th>한국어</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.length > 0 ?
                            result.map((week, index) => {
                                // 한 페이지에 글이 다섯개가 넘거나 글의 개수가 한도를 초과했을 때 공백을 리턴
                                    if(index + page * pagePerWords >= (page + 1) * pagePerWords || index + (pagePerWords * page) >= result.length){
                                        return "";
                                    }
                                    return <tr key={index + (pagePerWords * page)}>
                                        <td>{result[index + (pagePerWords * page)].japanese_rs}</td>
                                        <td>{result[index + (pagePerWords * page)].korean_rs}</td>
                                    </tr>
                                })
                            :
                            ""
                        }
                    </tbody>
                </table>
            </div>
            <div className="saveWordMap-foot">
                <div className="saveWordMap-foot-movePageControls">
                    <div id="saveWordMap-foot-movePageControls-control" onClick={() => changePage(-1)}>이전</div>
                    <div id="saveWordMap-foot-movePageControls-control" onClick={() => changePage(1)}>다음</div>
                </div>
                <div id="saveWordMap-foot-pageText">{page + 1}/{rsCounter > pagePerWords ? Math.ceil(rsCounter / pagePerWords) : 1}</div>
                <button id="saveWordMap-foot-removeAllRecord" onClick={() => removeAllRecord()}>기록 지우기</button>
            </div>
        </div>
    )
} 