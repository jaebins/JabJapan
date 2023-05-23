import "./components/suhyeonBirthday/suhyeon.css"
import cat from "./components/suhyeonBirthday/source/happy.gif" 
import img_1 from "./components/suhyeonBirthday/source/1.gif" 
import img_2 from "./components/suhyeonBirthday/source/2.gif" 
import img_3 from "./components/suhyeonBirthday/source/3.gif" 

export default function suhyeon(){
    return(
        <div className="suhyeon">
            <div className="suhyeon-head">
                <div id="suhyeon-head-title">★ 위대하시고 고귀하신 ★</div><br/>
                <div id="suhyeon-head-title">★ 수현 동지 탄신일을 ★</div><br/>
                <div id="suhyeon-head-title">★ 인민 장재빈은 ★</div><br/>
                <div id="suhyeon-head-title">★ 진심으로 ★</div><br/>
                <div id="suhyeon-head-title">★ 축하드리겠습네다! ★</div><br/>
            </div>
            <div className="suhyeon-body">
                <img id="suhyeon-body-sources" src={cat}></img>
                <img id="suhyeon-body-sources" src={img_1}></img>
                <img id="suhyeon-body-sources" src={img_2}></img>
                <img id="suhyeon-body-sources" src={img_3}></img>
            </div>
        </div>
    )
}