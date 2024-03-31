const imgPaths = ['img/bau.png','img/cua.png','img/tom.png','img/ca.png','img/huou.png','img/ga.png'];
const cardNameList = ['Bầu','Cua','Tôm','Cá','Hươu','Gà'];
let resultQtyList = [3,0,0,0,0,0];  //Số ảnh trong kết quả của hình ảnh thứ i
let betScoreList = [0,0,0,0,0,0];   //Lưu số điểm cược cho từng thẻ
let resultArr = [0,0,0];             //Mảng lưu kết quả
const resultImgNodeList = document.querySelectorAll('.result img');
const betCardNodeList = document.querySelectorAll('.bet .card');
console.log(betCardNodeList);
const betScoreNodeList = document.querySelectorAll('.bet .card span');
let betScore = 0;      //Điểm cược
const resetButton = document.getElementById('reset');
let execute = false;           //Xem ctrinh đang chạy hay ko
//So sánh 2 mảng cược và kết quả
function arrEqual(arr1,arr2){
    for(let i=0;i<6;i++){
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}
// Thực hiện quay và lưu kết quả
const btnPlay = document.getElementById('play');
btnPlay.addEventListener('click', () => {
    if(execute === false){
        execute = true;
        for(let i = 0;i<6;i++){
            resultQtyList[i] = 0;
        }
        btnPlay.style.color = 'gray';
        resetButton.style.color = 'gray';
        document.querySelector('body');
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
        
        //Đợi setInterval thực hiện xong(khoảng hơn 4s) mới cập nhật kq sau 5.5s(nên dùng Promise)
        setTimeout(() => {
            for(let value of resultArr){
                resultQtyList[value]++;
            }
            btnPlay.style.color = 'black';
            resetButton.style.color = 'black';
            if(arrEqual(resultQtyList,betScoreList)){
                console.log('Bạn đã đoán đúng với kết quả:'+ betScoreList.reduce((acc,value,index) => {
                    if(value > 0) return acc + cardNameList[index] + ' ' + betScoreList[index] + ' ';
                    else return acc;
                },' ')
                );
            }else{
                console.log('Bạn đã đoán sai với kết quả:'+ betScoreList.reduce((acc,value,index) => {
                    if(value > 0) return acc + cardNameList[index] + ' ' + betScoreList[index] + ' ';
                    else return acc;
                },' ')
                );
            }
            execute = false;
        }, 5500);        
    }
});

//Tăng điểm cược khi chọn ảnh
for(let i = 0;i<6;i++){
    betCardNodeList[i].addEventListener('click', () => {
        if(betScore < 3 && execute === false){
            const scoreText = betCardNodeList[i].querySelector('span');
            const previousScore = Number.parseInt(scoreText.innerText);
            betScoreList[i] = previousScore + 1;
            scoreText.innerText = previousScore + 1;
            betScore++;
        }
    });
}

//Reset ảnh
resetButton.onclick = () => {
    if(execute === false){
        for(let i=0;i<6;i++){
            betScoreList[i] = 0;
            betScore = 0;
            const scoreText = betCardNodeList[i].querySelector('span');
            scoreText.innerText = 0;
        }
    }
};
