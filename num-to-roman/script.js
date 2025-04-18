const numberInput = document.getElementById('number')
const convertBtn = document.getElementById('convert-btn')
const output = document.getElementById('output')
const romanIntMap = [
    ['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]
]
const numToRoman = function(input){
    //把input的值從字串轉換成數字
    //用let才可以在迴圈裡更新輸入值
    let inputVal = parseInt(input.value)
    //儲存羅馬數字的字串
    let result = ''
    for(let key = 0;key < romanIntMap.length; key++){
        let [roman,value] = romanIntMap[key]
        //while迴圈裡的條件為true就會執行裡面的動作
        while(inputVal >= value){
            //更新輸入值
            inputVal -= value
            //更新羅馬數字
            result += roman
        }
    } 
    output.style.display = 'block'
    output.innerText = result
}
const showResult = (input)=>{ 
    //把input的值從字串轉換成數字
    let inputVal = parseInt(input.value)
    //檢查輸入值是否為空值
    if(!inputVal || isNaN(inputVal)){
        output.style.display = 'block'
        output.innerText = "Please enter a valid number"
        return
    }
    //檢查是否小於0
    if( inputVal < 0){
        output.style.display = 'block'
        output.innerText = "Please enter a number greater than or equal to 1"
        input.value = ''
        return       
    }//檢查是否大於3999
    else if(inputVal >= 4000){
        output.style.display = 'block'
        output.innerText = "Please enter a number less than or equal to 3999"
        input.value = ''
        return
    }else{     
        numToRoman(input);
    }
}
numberInput.addEventListener('keydown',(event)=>{if(event.key === 'e'){
    event.preventDefault()
}})
convertBtn.addEventListener('click',()=>{showResult(numberInput)})