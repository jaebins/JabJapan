import './components/translate/translate.css';
import './components/practice/practice.css';
import Head from "./components/head";
import Neck from "./components/translate/translate_Neck"
import Body from "./components/translate/translate_Body";
import { useEffect, useState } from 'react';
import Cookies from "react-cookies"
import { useMediaQuery } from 'react-responsive';
import * as Hangul from 'hangul-js';

function TranslateApp() {
  const hiragana_original = "あかさたなはまやらわがざだばぱ" +
    "いきしちにひみりゐぎじぢびぴ" +
    "うくすつぬふむゆるぐずづぶぷ" +
    "えけせてねへめれゑげぜでべぺ" +
    "おこそとのほもよろをごぞどぼぽ" +
    "ゔ" +
    "アカサタナイキシチニウクスツヌエケセテネオコソトノ" +
    "ヴハマヤラヒミリフムユルヘメレホモヨロ" +
    "ワガザダバパヰギジヂビピグズヅブプヱゲゼデベペヲゴゾドボポ";

  const hiragana = "あかさたなはまやらわがざだばぱ" +
    "いきしちにひみりぎじびぴ" +
    "うくすつぬふむゆるぐずぶぷ" +
    "えけせてねへめれげぜでべぺ" +
    "おこそとのほもよろをごぞどぼぽ" +
    "アカサタナイキシチニウクスツヌエケセテネオコソトノ" + // 가타카나
    "ハマヤラヒミリフムユルヘメレホモヨロ" +
    "ワガザダバパギジビピグズヅブプ" +
    "ゲゼデベペヲゴゾドボポ";
  const hiragana_ko = "아카사타나하마야라와" +
    "가자다바파이키시치니히미리기지비피우쿠스츠누" +
    "푸무유루구즈부푸에케세테네헤메레게제데베페" +
    "오코소토노호모요로워고조도보포" +
    "아카사타나이키시치니우쿠수츠누에케세테네오코소토노" + // 가타카나
    "하마야라히미리푸무유루헤메레호모요로" +
    "와가자다바파기지비피구주주부푸" +
    "게제데베페워고조도보포";

  const server_URL = "";
  // const server_URL = "http://localhost:8001"
  
  const [transMode, setTransMode] = useState({ // 현재 번역 모드 (targetLan = ja : 일본어 발음을 한국어로, ko : 한국어를 일본어 발음으로)
    targetLan: "ja",
    resultLan: "ko"
  });
  const [result, setResult] = useState({ // 화면에 보여질 결과
    japanese_rs: "",
    korean_rs: "",
  })
  const [rsCounter, setRsCounter] = useState(0);

  useEffect(() => {
    if(!isNaN(Cookies.load("rsCounter"))){
      setRsCounter(Number(Cookies.load("rsCounter")) + 1);
    }
  }, [])

  const isSmallScreen = useMediaQuery({maxWidth: 500});
  

  // 번역 모드를 바꿔주는 이벤트
  const changeMode = () => {
    var input = document.getElementById("translate-body-workingArea-inputArea-inputTarget");

    if (transMode.targetLan == "ja") {
      setTransMode({
        targetLan: "ko",
        resultLan: "ja",
      });
      
      input.placeholder = "단어를 입력해주세요.";
    }
    else {
      setTransMode({
        targetLan: "ja",
        resultLan: "ko"
      });
      input.placeholder = "일본식 발음으로 정확하게 입력해주세요.";
    }

    input.value = "";
  }

  const checkOnlyJapanese = (char) => {
    for (let i = 0; i < char.length; i++) {
      if (!hiragana_original.includes(char[i])) {
        return false;
      }
    }
    return true;
  }

  // targetText를 해당하는 발음으로 바꿔주는 이벤트
  const convert_Pronunciation = (targetText, findArr, matchArr, checkTransOriginalWord) => {
    let convert_target = "";
    if(findArr.length < 1){ // 일본어와 한자를 분리해주는 작업이라면
      convert_target = targetText;
    }
    let backup = {
      thieroglyph: "",
      japanese: ""
    }

    let getJapanPronunciation_InResultJp = false;
    if (targetText[targetText.length - 1] == "t") { // 만약 targetText가 한자가 없는 순수한 일본어이면 한자와 나누지 않음 
      getJapanPronunciation_InResultJp = true;
      targetText = targetText.substr(0, targetText.length - 1);
    }

    for (let i = 0; i < targetText.length; i++) {
      let char = targetText[i];
      let append_N = "";

      if (transMode.resultLan == "ko" && !checkTransOriginalWord) { // 일본어 발음을 알려고 한다면
        let cuttingHangul = Hangul.disassemble(targetText[i]);
        if(cuttingHangul[1] == "ㅐ" || cuttingHangul[1] == "ㅒ" || cuttingHangul[1] == "ㅖ"){ 
          cuttingHangul[1] = "ㅔ"
          char = Hangul.assemble(cuttingHangul);
        }
        if (cuttingHangul.length > 2 && char != "와" && char != "워") { // 한글 받침 제거
          cuttingHangul.length = 2;
          char = Hangul.assemble(cuttingHangul);
          append_N = "ん";
          // console.log("ㄴ 확인");
        }
      }

      let index = findArr.indexOf(char);
      if (index != -1 && (transMode.resultLan == "ko" || hiragana_original.includes(char))) {
        convert_target += matchArr[index];
        convert_target += append_N // 일본어 ㄴ 발음 확인
      }
      // 일본어를 한국어로 바꿀 때, 일본어에서 ん 또는 ン를 찾는다면 받침 ㄴ을 추가해줌
      else if (index == -1 && (transMode.resultLan == "ja" || checkTransOriginalWord) && (char == "ん" || char == "ン") && findArr.length > 0) {
        // console.log("ん ン 확인 - ", convert_target[convert_target.length - 1]);
        let char_append_N = Hangul.disassemble(convert_target[convert_target.length - 1])
        char_append_N.push("ㄴ")
        char_append_N = Hangul.assemble(char_append_N);
        convert_target = convert_target.substr(0, convert_target.length - 1);
        convert_target += char_append_N;
      }
      // 일본어를 한국어로 바꿀 때, 한자를 찾는다면 분리해줌
      else if (index == -1 && (transMode.resultLan == "ja" || checkTransOriginalWord) &&
      !checkOnlyJapanese(char) && !getJapanPronunciation_InResultJp && char != " " && !(char == "ん" || char == "ン")) {
        let temp = backup.thieroglyph + targetText[i];
        targetText = targetText.replace(targetText[i], "");
        backup = {
          thieroglyph: temp,
          japanese: targetText,
        }
        // console.log("한자 확인", temp, "일본어 : ", backup.japanese);
        convert_target = `${backup.thieroglyph} & ${backup.japanese}`;
        i--; // 문자수가 빠졌기 때문에 반복문 변수를 1 빼줌
      }
    }

    return convert_target;
  }

  const checkMode = (targetText, checkTransOriginalWord) => {
    let convert_target = targetText;
    if (!checkTransOriginalWord.checked && transMode.resultLan == "ko") { // 일본어 발음을 알려고 한다면
      convert_target = convert_Pronunciation(targetText, hiragana_ko, hiragana, checkTransOriginalWord.checked);
    }
    return convert_target;
  }

  const setCookieAndResult = (rs) => {
    let tempRs = {
      japanese_rs: rs.originalJapanese_rs != "" ? rs.originalJapanese_rs : rs.japanese_rs,
      korean_rs: rs.originalKorean_rs != "" ? rs.originalKorean_rs : rs.korean_rs,
    }
    setRsCounter(rsCounter + 1);
    Cookies.save("rs" + Number(rsCounter + 1), tempRs);
    Cookies.save("rsCounter", rsCounter);
    setResult(rs);
  }

  const jaMode_OriginalTranslate = (originalText, convert_target, rs) => {
    const url = server_URL + `/translate?text=${convert_target}`;

    fetch(url)
      .then((res) => {
        return res.json()
      }).then((rs) => {
        rs.originalJapanese_rs = originalText;
        rs.originalKorean_rs = "";
        rs.korean_rs = rs.message.result.translatedText;
        rs.japanese_rs = convert_Pronunciation(convert_target, hiragana, hiragana_ko, true);
        setCookieAndResult(rs);
      })
  }

  const jaMode_Translate = (doc, rs, backupText) => {
    rs.japanese_rs = backupText;
    if (doc.querySelectorAll(".txt_search").length > 1) {
      rs.korean_rs = !checkOnlyJapanese(doc.querySelectorAll(".txt_search")[1].innerText) ? // 만약 일본어가 들어있는게 아니라면 두번째 의미까지 추가해줌
        doc.querySelectorAll(".txt_search")[1].innerText + ", " : "";
    }
    rs.korean_rs += `${doc.querySelectorAll(".txt_search")[0].innerText}`;

    return rs;
  }

  const koMode_translate = (doc, rs) => {
    let parsingRs = doc.querySelectorAll(".kujk_type > .search_word > .tit_searchword > .txt_searchword");
    if(parsingRs.length < 1){
      parsingRs = doc.querySelectorAll(".kukj_type > .list_search > li > .txt_search");
    }
    
    rs.japanese_rs = parsingRs[0].innerText;
    rs.korean_rs = convert_Pronunciation(rs.japanese_rs + "t", hiragana, hiragana_ko, false);
    rs.japanese_rs = convert_Pronunciation(rs.japanese_rs, [], [], false); // 한자와 일본어를 분리하는 작업
    
    return rs;
  }

  // input에 입력된 데이터를 번역시켜주는 이벤트
  const translate = () => {

    const targetText = document.getElementById("translate-body-workingArea-inputArea-inputTarget").value;
    if (targetText.length < 1) {
      return;
    }

    const checkTransOriginalWord = document.getElementById("translate-body-workingArea-inputArea-checkTransOriginalWord");
    let rs = {
      japanese_rs: "",
      originalJapanese_rs: "",
      korean_rs: "",
      originalKorean_rs: ""
    }

    let convert_target = checkMode(targetText, checkTransOriginalWord);

    if (checkTransOriginalWord.checked && transMode.resultLan == "ko") { // 일본어 그대로 변역할려고 한다면
      jaMode_OriginalTranslate(targetText, convert_target, checkTransOriginalWord, rs)
    }
    else {
      const url = server_URL + `/findWord/?q=${convert_target}`;

      fetch(url)
          .then(res => {
            return res.text();
          }).then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            
            if(transMode.resultLan == "ja"){ // 한국어를 일본어로
              rs.originalKorean_rs = targetText;
              rs = koMode_translate(doc, rs);
            }
            else{
              rs = jaMode_Translate(doc, rs, convert_target); // 한국어 발음 일본어를 일본어로
            }

            setCookieAndResult(rs);
          }).catch((err) => {
            alert(err);
          })
    }

  }

  return (
    <div className="TranslateApp">
      <Head title={"TranslateMode"} link="/"></Head>
      <Neck isSmallScreen={isSmallScreen}></Neck>
      <Body changeMode={changeMode} translate={translate} transMode={transMode} result={result}></Body>
    </div>
  );
}
export default TranslateApp;
