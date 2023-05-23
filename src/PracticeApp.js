import "./components/practice/practice.css"
import {useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive"
import Head from "./components/head";
import Neck from "./components/practice/practice_Neck";
import Body from "./components/practice/practice_Body";
import Foot from "./components/practice/practice_Foot";

const hiragana = "あかさたなはまやらわがざだばぱ" +
          "いきしちにひみりゐぎじぢびぴ" +
          "うくすつぬふむゆるぐずづぶぷ" +
          "えけせてねへめれゑげぜでべぺ" +
          "おこそとのほもよろをごぞどぼぽ" +
          "ゔん";
const hiraganaEn = "a ka sa ta na ha ma ya ra wa ga za da ba pa " +
    "i ki shi chi ni hi mi ri wi gi ji dji bi pi " +
    "u ku su tsu nu fu mu yu ru gu zu dzu bu pu " +
    "e ke se te ne he me re we ge ze de be pe " +
    "o ko so to no ho mo yo ro wo go zo do bo po " +
    "v n";
const katakana = "アカサタナイキシチニウクスツヌエケセテネオコソトノ" +
    "ヴンハマヤラヒミリフムユルヘメレホモヨロ" +
    "ワガザダバパヰギジヂビピグズヅブプヱゲゼデベペヲゴゾドボポ";
const katakanaEn = "a ka sa ta na i ki shi chi ni u ku su tsu nu e ke se te ne o ko so to no v n " +
    "ha ma ya ra hi mi ri fu mu yu ru he me re ho mo yo ro " +
    "wa ga za da ba pa wi gi ji dji bi pi gu zu dzu bu pu " +
    "we ge ze de be pe wo go zo do bo po";

var hiragana_Arr = [];
var hiraganaEn_Arr = [];
var katakana_Arr = [];
var katakanaEn_Arr = [];
  
function makeArr(){
    for(var i = 0; i < hiragana.length; i++){
      hiragana_Arr[i] = hiragana[i];
    }
    for(i = 0; i < katakana.length; i++){
      katakana_Arr[i] = katakana[i];
    }

    hiraganaEn_Arr = hiraganaEn.split(' ');
    katakanaEn_Arr = katakanaEn.split(' ');
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function App() {
  const [isStart, setIsStart] = useState(false);
  const [answelInfor, setAnswelInfor] = useState({
    type: '',
    mode: '',
    tarEn_Arr: [],
    question: '',
    answel: '',
    answelNum: 0,
  })
  const [options, setOptions] = useState([])
  
  const isSmallScreen = useMediaQuery({maxWidth: 500})

  useEffect(() => {
    if(hiragana_Arr.length === 0){
      makeArr();
    }
  }, [])

  var createQuestion = (type, mode) => {
    var tar_Arr = katakana_Arr;
    var tarEn_Arr = katakanaEn_Arr;
    if(type === "Hiragana"){
      tar_Arr = hiragana_Arr;
      tarEn_Arr = hiraganaEn_Arr;
    }

    var questionIndex = rand(0, tar_Arr.length);
    var question = tar_Arr[questionIndex];
    var answel = tarEn_Arr[questionIndex];
    var answelNum = rand(0, 3);
    
    var answelInfor_dummy = {
      type: type,
      mode: mode,
      tarEn_Arr: tarEn_Arr,
      question: question,
      answel: answel,
      answelNum: answelNum,
    };
    setAnswelInfor(answelInfor_dummy);

    if(!isStart){
      setIsStart(true);
    }
  }

  // 리엑트는 비동기이기 때문에 문제가 만들어지면 선택지가 만들어짐(answelInfor 객체가 채워질 때 실행됨)
  useEffect(() => {
    var optionArr = []

    for(var i = 0; i < 3; i++){
      do{
        var ranIndex = rand(0, answelInfor.tarEn_Arr.length);
        optionArr[i] = answelInfor.tarEn_Arr[ranIndex];
      }while(optionArr[i] === answelInfor.answel)
      if(answelInfor.answelNum === i){
        optionArr[i] = answelInfor.answel;
      }
    }

    setOptions(optionArr); 
  }, [answelInfor])

  var selectOption = (num) => {
    if(num === answelInfor.answelNum){
      createQuestion(answelInfor.type, answelInfor.mode);
    }
    else{
      alert("오답!");
    }
  }

  var inputAnswel = () => {
    if(window.event.keyCode == "13"){
      var input = document.getElementById("practice-body-user-write-input")
      if(answelInfor.answel === input.value){
        createQuestion(answelInfor.type, answelInfor.mode);
      }
      else{
        alert("오답!");
      }
    }
    input.value = "";
  }

  return (
    <div className="PracticeApp">
      <Head title={"PracticeMode"} link="/practice"></Head>
      <Neck isSmallScreen={isSmallScreen} createQuestion={createQuestion}></Neck>  
      <Body answelInfor={answelInfor} selectOption={selectOption} options={options} inputAnswel={inputAnswel} isStart={isStart}></Body>
      <Foot></Foot>      
    </div>
  );
}

export default App;