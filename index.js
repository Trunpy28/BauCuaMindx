const imgPaths = ['img/bau.png','img/cua.png','img/tom.png','img/ca.png','img/huou.png','img/ga.png'];
let resultQtyList = [3,0,0,0,0,0];  //Số ảnh trong kết quả của hình ảnh thứ i
let resultArr = [0,0,0]             //Mảng lưu kết quả
const resultImgNodeList = document.querySelectorAll('.result img');
const betCardNodeList = document.querySelectorAll('.bet card');
const betScoreNodeList = document.querySelectorAll('.bet .card span');
let betScore = 0;      //Điểm cược
// Thực hiện quay và lưu kết quả
const btnPlay = document.getElementById('play');
btnPlay.addEventListener('click', (event) => {
    resultQtyList = [0,0,0,0,0,0];
    let i = 0;
    const interval = setInterval(() => {
        for(let j=0;j<3;j++){
            resultArr[j] = Math.floor(Math.random() * 6);
            resultImgNodeList[j].src = imgPaths[resultArr[j]];
        }
        i++;
        if (i===100) {
            clearInterval(interval);
        }
    }, 40);

    //Đợi setInterval thực hiện xong mới cập nhật kq(có thể dùng Promise)
    setTimeout(() => {
        for(let value of resultArr){
            resultQtyList[value]++;
        }
        console.log(resultArr);
        console.log(resultQtyList);
    }, 6000);        
});